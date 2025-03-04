package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.pojo.req.role.RoleListPageReq;
import com.cy.single.blog.pojo.req.role.RoleSaveReq;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-26
 */
public interface SysRoleService {

    ApiResp<String> add(RoleSaveReq param);

    ApiResp<String> edit(RoleSaveReq param);

    ApiResp<String> freeze(RoleSaveReq req);

    ApiResp<String> delete(Long surrogateId);

    PageResult<SysRole> pageList(RoleListPageReq param);

}
