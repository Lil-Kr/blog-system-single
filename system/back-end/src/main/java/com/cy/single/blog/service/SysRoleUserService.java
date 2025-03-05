package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.roleuser.RoleUserReq;

import java.util.List;
import java.util.Map;

/**
 * role-user service
 */
public interface SysRoleUserService {

//    ApiResp add(RoleUserParam param) throws Exception;
//
//    ApiResp edit(RoleUserParam param) throws Exception;

    ApiResp<String> updateRoleUsers(RoleUserReq param);

//    ApiResp roleUserPageList(RoleUserParam param) throws Exception;

    ApiResp<Map<String, List<SysUser>>> roleUserList(RoleUserReq param);
}
