package com.cy.single.blog.dao;

import com.cy.single.blog.pojo.entity.SysUser;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import org.apache.ibatis.annotations.Param;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
public interface SysUserMapper {

    SysUser getUserById(Long id);

    SysUser getUserBySurrogateId(Long surrogateId);

    SysUser getUserByToken(String token);

    SysUser getUserByKeyword(@Param("param") UserLoginAdminReq reqParam);
}
