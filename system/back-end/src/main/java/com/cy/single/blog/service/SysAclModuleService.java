package com.cy.single.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleDelReq;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleListReq;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleReq;
import com.cy.single.blog.pojo.vo.sys.aclmodule.SysAclModuleVO;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: acl module
 */
public interface SysAclModuleService extends IService<SysAclModule> {

    ApiResp<String> addAclModule(AclModuleReq param);

    ApiResp<String> editAclModule(AclModuleReq param);

    ApiResp aclModuleTree();

    ApiResp delete(AclModuleDelReq param);

    ApiResp<SysAclModuleVO> getAclModule(Long surrogateId);

    ApiResp<List<SysAclModuleVO>> aclModuleList(AclModuleListReq req);
}
