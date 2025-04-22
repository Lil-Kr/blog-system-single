package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.sys.role.RoleListPageReq;
import com.cy.single.blog.pojo.req.sys.role.RoleSaveReq;
import com.cy.single.blog.pojo.resp.sys.role.SysRoleResp;

/**
 * @Author: Lil-K
 * @Date: 2025/3/12
 * @Description:
 */
public interface SysRoleService {

	ApiResp<String> add(RoleSaveReq param);

	ApiResp<String> edit(RoleSaveReq param);

	ApiResp<String> freeze(RoleSaveReq req);

	ApiResp<String> delete(Long surrogateId);

	PageResult<SysRoleResp> pageList(RoleListPageReq param);

	boolean checkSupperAdminExist();
}
