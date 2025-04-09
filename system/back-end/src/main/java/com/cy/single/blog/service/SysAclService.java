package com.cy.single.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.req.acl.AclPageReq;
import com.cy.single.blog.pojo.req.acl.AclReq;
import com.cy.single.blog.pojo.resp.sys.acl.SysAclResp;

import java.util.concurrent.ConcurrentHashMap;

/**
 * @Author: Lil-K
 * @Date: 2025/3/9
 * @Description:
 */
public interface SysAclService extends IService<SysAcl> {

  ApiResp<String> add(AclReq req);

  ApiResp<String> edit(AclReq req);

  PageResult<SysAclResp> pageList(AclPageReq req);

  ApiResp<ConcurrentHashMap<String, Object>> acls(AclReq req);

  ApiResp<String> delete(Long id);

  Long getAclCountByAclModuleId(Long aclModuleId);
}
