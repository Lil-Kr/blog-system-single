package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserListPageReq;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.vo.sys.user.SysUserVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/7
 * @Description:
 */
public interface SysUserMapper extends BaseMapper<SysUser> {

	SysUser loginAdmin(@Param("param") UserLoginAdminReq req);

	SysUser getUserById(Long id);

	SysUser getUserBySurrogateId(Long surrogateId);

	SysUser getUserByToken(String token);

	SysUser getUserByKeyword(@Param("param") UserLoginAdminReq req);

	SysUser getUserByAccount(String account);

	Integer updateUserBySurrogateId(@Param("param") SysUser user);

	List<SysUserVO> pageUserList(@Param("param") UserListPageReq req);

	Integer countUserList(@Param("param") UserListPageReq req);

}
