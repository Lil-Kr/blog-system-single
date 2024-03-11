package com.cy.single.blog.service.impl;

import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.pojo.entity.SysUser;
import com.cy.single.blog.service.SysUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
@Service
@Slf4j
public class UserServiceImpl implements SysUserService {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Override
    public SysUser getUserById(String id) {
        return sysUserMapper.getUserById(id);
    }

    @Override
    public SysUser getUserBySurrogateId(String surrogateId) {
        return sysUserMapper.getUserBySurrogateId(surrogateId);
    }
}
