package com.cy.single.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.req.acl.AclPageReq;
import com.cy.single.blog.pojo.req.acl.AclReq;
import com.cy.single.blog.pojo.vo.sys.acl.SysAclVo;

import java.util.concurrent.ConcurrentHashMap;

/**
 * acl service
 */
public interface SysAclService extends IService<SysAcl> {

    ApiResp<String> addAcl(AclReq req);

    ApiResp<String> editAcl(AclReq req);

    PageResult<SysAclVo> pageList(AclPageReq req);

    ApiResp<ConcurrentHashMap<String, Object>> acls(AclReq req);
}
