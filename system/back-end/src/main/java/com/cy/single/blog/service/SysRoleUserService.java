package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.req.sys.roleuser.RoleUserReq;
import com.cy.single.blog.pojo.resp.sys.role.RoleUserResp;

/**
 * role-user service
 * @Author: Lil-K
 * @Date: 2025/3/31
 * @Description:
 */
public interface SysRoleUserService {

	ApiResp<String> updateRoleUsers(RoleUserReq req);

	ApiResp<RoleUserResp> roleUserList(RoleUserReq req);
}
