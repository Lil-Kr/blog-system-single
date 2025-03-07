package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserListPageReq;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.req.user.UserRegisterReq;
import com.cy.single.blog.pojo.req.user.UserSaveReq;
import com.cy.single.blog.pojo.vo.sys.user.SysUserVO;

/**
 * @Author: Lil-K
 * @Date: 2025/3/7
 * @Description:
 */
public interface SysUserService {

	SysUser getUserById(Long id);

	SysUser getUserBySurrogateId(Long surrogateId);

	ApiResp<String> adminLogin(UserLoginAdminReq reqParam);

	ApiResp<Integer> registerAdmin(UserRegisterReq req);

	ApiResp<String> add(UserSaveReq req);

	PageResult<SysUserVO> pageUserList(UserListPageReq req);
}
