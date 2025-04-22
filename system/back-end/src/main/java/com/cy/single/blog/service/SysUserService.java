package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.sys.user.*;
import com.cy.single.blog.pojo.resp.sys.user.SysUserResp;

/**
 * @Author: Lil-K
 * @Date: 2025/3/7
 * @Description:
 */
public interface SysUserService {

	SysUser getUserById(Long id);

	SysUserResp getUserBySurrogateId(Long surrogateId);

	ApiResp<SysUser> adminLogin(UserLoginAdminReq reqParam);

	ApiResp<Integer> registerAdmin(UserRegisterReq req);

	ApiResp<String> add(UserSaveReq req);

	PageResult<SysUserResp> pageList(UserListPageReq req);

	ApiResp<String> edit(UserSaveReq req);

	ApiResp<String> delete(Long surrogateId);

  ApiResp<String> uploadAvatar(AvatarUploadReq req) throws Exception;
}
