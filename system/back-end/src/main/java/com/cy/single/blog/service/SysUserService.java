package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.req.user.UserRegisterApiReq;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
public interface SysUserService {

    SysUser getUserById(Long id);

    SysUser getUserBySurrogateId(Long surrogateId);

    ApiResp<String> adminLogin(UserLoginAdminReq reqParam);

    ApiResp<Integer> registerAdmin(UserRegisterApiReq req);
}
