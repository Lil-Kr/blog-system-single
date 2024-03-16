package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.pojo.entity.SysUser;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.service.SysUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static com.cy.single.blog.enums.ReturnCodeEnum.*;

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
    public SysUser getUserById(Long id) {
        return sysUserMapper.getUserById(id);
    }

    @Override
    public SysUser getUserBySurrogateId(Long surrogateId) {
        return sysUserMapper.getUserBySurrogateId(surrogateId);
    }

    @Override
    public ApiResp<SysUser> adminLogin(UserLoginAdminReq reqParam) {
        SysUser user = sysUserMapper.getUserByKeyword(reqParam);
        if (Objects.isNull(user)) {
            return ApiResp.failure(LOGIN_ACCOUNT_ERROR.getCode(), LOGIN_ACCOUNT_ERROR.getMessage());
        }

        // TODO 更新token到缓存

        return ApiResp.success(user);
    }


}
