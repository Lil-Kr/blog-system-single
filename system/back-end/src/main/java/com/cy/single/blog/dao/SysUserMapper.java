package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.AvatarUploadReq;
import com.cy.single.blog.pojo.req.user.UserListPageReq;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.req.user.UserSaveReq;
import com.cy.single.blog.pojo.resp.sys.user.SysUserResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/7
 * @Description:
 */
@Repository
public interface SysUserMapper extends BaseMapper<SysUser> {

  SysUser loginAdmin(@Param("param") UserLoginAdminReq req);

  SysUser getUserById(Long id);

  SysUserResp getUserBySurrogateId(Long surrogateId);

  SysUser getUserByToken(String token);

  SysUser getUserByKeyword(@Param("param") UserLoginAdminReq req);

  SysUser getUserByAccount(String account);

  Integer updateUserBySurrogateId(@Param("param") SysUser user);

  List<SysUserResp> pageUserList(@Param("param") UserListPageReq req);

  Integer countUserList(@Param("param") UserListPageReq req);

  List<SysUserResp> selectUserInfoExist(@Param("param") UserSaveReq req);

  List<SysUserResp> selectUserListByIds(@Param("userIdList") List<Long> userIdList);

  List<SysUserResp> selectUserList();

  int updateAvatar(@Param("param") AvatarUploadReq req);
}
