package com.cy.single.blog.service;

import com.cy.single.blog.pojo.entity.SysUser;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
public interface SysUserService {

    SysUser getUserById(String id);

    SysUser getUserBySurrogateId(String surrogateId);

}
