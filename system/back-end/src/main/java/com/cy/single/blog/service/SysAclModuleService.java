package com.cy.single.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
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

    ApiResp<String> addAclModule(AclModuleReq req);

    ApiResp<String> editAclModule(AclModuleReq req);

    ApiResp aclModuleTree();

    ApiResp delete(Long surrogateId);

    ApiResp<SysAclModuleVO> getAclModule(Long surrogateId);

    ApiResp<List<SysAclModuleVO>> aclModuleList(AclModuleListReq req);
}
