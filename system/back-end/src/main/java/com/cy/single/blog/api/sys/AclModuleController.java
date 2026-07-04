package com.cy.single.blog.api.sys;


import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.dto.image.sys.aclmodule.AclModuleDTO;
import com.cy.single.blog.pojo.req.sys.aclmodule.AclModuleListReq;
import com.cy.single.blog.pojo.req.sys.aclmodule.AclModuleReq;
import com.cy.single.blog.pojo.resp.sys.aclmodule.SysAclModuleResp;
import com.cy.single.blog.service.SysAclModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: acl-module api
 */
@RestController
@RequestMapping("/sys/aclModule")
public class AclModuleController {

  @Autowired
  private SysAclModuleService aclModuleService;

  /**
   * create acl module
   * @param req
   * @return
   * @throws Exception
   */
  @CheckAuth
  @RecordLogger
  @PostMapping("/add")
  public ApiResp add(@RequestBody @Validated({AclModuleReq.GroupAdd.class}) AclModuleReq req) {
    return aclModuleService.add(req);
  }

  /**
   * edit acl module
   * @param req
   * @return
   * @throws Exception
   */
  @CheckAuth
  @RecordLogger
  @PostMapping("/edit")
  public ApiResp<String> edit(@RequestBody @Validated({AclModuleReq.GroupEdit.class}) AclModuleReq req) {
    return aclModuleService.edit(req);
  }

  /**
   * get one record acl module
   * @param surrogateId
   * @return
   */
  @CheckAuth
  @RecordLogger
  @GetMapping("/getAclModule/{surrogateId}")
  public ApiResp<SysAclModuleResp> getAclModule(@PathVariable("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return aclModuleService.getAclModule(surrogateId);
  }

  /**
   * retrieve acl module tree
   * @throws Exception
   */
  @CheckAuth
  @RecordLogger
  @PostMapping("aclModuleTree")
  public ApiResp<List<AclModuleDTO>> aclModuleTree() {
    return aclModuleService.aclModuleTree();
  }

  /**
   * delete acl module
   * @return
   * @throws Exception
   */
  @CheckAuth
  @RecordLogger
  @DeleteMapping("/delete/{surrogateId}")
  public ApiResp<String> delete(@PathVariable("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return aclModuleService.delete(surrogateId);
  }

  /**
   * query acl module all list
   * @return
   */
  @CheckAuth
  @RecordLogger
  @PostMapping("/list")
  public ApiResp<List<SysAclModuleResp>> list(@RequestBody AclModuleListReq req) {
    return aclModuleService.list(req);
  }

}

