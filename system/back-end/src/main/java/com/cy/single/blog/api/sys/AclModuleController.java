package com.cy.single.blog.api.sys;


import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleListReq;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleReq;
import com.cy.single.blog.pojo.resp.sys.aclmodule.SysAclModuleResp;
import com.cy.single.blog.service.SysAclModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 权限模块管理
 * @author Lil-Kr
 * @since 2020-11-28
 */
@RestController
@RequestMapping("/sys/aclModule")
public class AclModuleController {

	@Autowired
	private SysAclModuleService aclModuleService;

	/**
	 * 新增权限模块
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
	 * 更新权限模块
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
	 * 获取单个权限模块信息
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
	 * 获得权限模块树
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("aclModuleTree")
	public ApiResp aclModuleTree() {
		return aclModuleService.aclModuleTree();
	}

	/**
	 * 删除权限模块功能
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@DeleteMapping("/delete/{surrogateId}")
	public ApiResp delete(@PathVariable("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
		return aclModuleService.delete(surrogateId);
	}

	/**
	 * 查询权限模块列表
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/list")
	public ApiResp<List<SysAclModuleResp>> list(@RequestBody AclModuleListReq req) {
		return aclModuleService.list(req);
	}

}

