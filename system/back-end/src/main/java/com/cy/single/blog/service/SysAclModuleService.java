package com.cy.single.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.dto.sys.aclmodule.AclModuleDTO;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import com.cy.single.blog.pojo.req.sys.aclmodule.AclModuleListReq;
import com.cy.single.blog.pojo.req.sys.aclmodule.AclModuleReq;
import com.cy.single.blog.pojo.resp.sys.aclmodule.SysAclModuleResp;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: acl module
 */
public interface SysAclModuleService extends IService<SysAclModule> {

  ApiResp<String> add(AclModuleReq req);

  ApiResp<String> edit(AclModuleReq req);

  ApiResp<List<AclModuleDTO>> aclModuleTree();

  ApiResp<String> delete(Long surrogateId);

  ApiResp<SysAclModuleResp> getAclModule(Long surrogateId);

  ApiResp<List<SysAclModuleResp>> list(AclModuleListReq req);
}
