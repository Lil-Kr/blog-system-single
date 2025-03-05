package com.cy.single.blog.api.sys;


import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleDelReq;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleReq;
import com.cy.single.blog.service.SysAclModuleService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.Objects;

/**
 * 权限模块管理
 * @author Lil-Kr
 * @since 2020-11-28
 */
@RestController
@RequestMapping("/sys/aclModule")
public class AclModuleController {

    @Resource
    private SysAclModuleService aclModuleService;

    /**
     * 保存权限模块信息
     * @param req
     * @return
     * @throws Exception
     */
    @PostMapping("save")
    public ApiResp<String> save(@RequestBody @Valid AclModuleReq req) throws Exception {
        if (Objects.isNull(req.getSurrogateId())) { // insert
            return aclModuleService.addAclModule(req);
        }else { // update
            return aclModuleService.editAclModule(req);
        }
    }

    /**
     * 新增权限模块
     * @param req
     * @return
     * @throws Exception
     */
    @PostMapping("addAclModule")
    public ApiResp addAclModule(@RequestBody @Valid AclModuleReq req) throws Exception {
        return aclModuleService.addAclModule(req);
    }

    /**
     * 更新权限模块
     * @param req
     * @return
     * @throws Exception
     */
    @PostMapping("editAclModule")
    public ApiResp editAclModule(@RequestBody @Valid AclModuleReq req) throws Exception {
        return aclModuleService.editAclModule(req);
    }

    /**
     * 获得权限模块树
     * @throws Exception
     */
    @PostMapping("aclModuleTree")
    public ApiResp aclModuleTree() throws Exception {
        return aclModuleService.aclModuleTree();
    }

    /**
     * 删除权限模块功能
     * @param req
     * @return
     * @throws Exception
     */
    @PostMapping("delete")
    public ApiResp delete(@RequestBody @Valid AclModuleDelReq req) throws Exception {
        return aclModuleService.delete(req);
    }

}

