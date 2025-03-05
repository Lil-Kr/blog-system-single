package com.cy.single.blog.service;


import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.req.roleacl.RoleAclSaveReq;


/**
 * role-acl service
 */
public interface SysRoleAclService {

    ApiResp<String> changeRoleAcls(RoleAclSaveReq param);

}
