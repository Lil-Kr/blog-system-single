package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import org.apache.ibatis.annotations.Param;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
public interface SysUserMapper extends BaseMapper<SysUser> {

    SysUser getUserById(Long id);

    SysUser getUserBySurrogateId(Long surrogateId);

    SysUser getUserByToken(String token);

    SysUser getUserByKeyword(@Param("param") UserLoginAdminReq reqParam);

    SysUser getUserByAccount(String account);

    SysUser getUserByAny(@Param("param") UserLoginAdminReq reqParam);

    Integer updateUserById(@Param("param") SysUser user);
}
