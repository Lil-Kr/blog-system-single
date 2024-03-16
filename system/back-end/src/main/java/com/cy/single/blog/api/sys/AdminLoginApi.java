package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.NoCheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.SysUser;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.service.SysUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @Author: Lil-K
 * @Date: 2024/3/11
 * @Description: 后台登陆登出
 */
@Slf4j
@RestController
@RequestMapping("/sys/admin")
public class AdminLoginApi {

    @Autowired
    private SysUserService userService;

    @NoCheckAuth
    @RecordLogger
    @PostMapping("/login")
    public ApiResp<SysUser> login(@RequestBody @Valid UserLoginAdminReq reqParam) {
        return userService.adminLogin(reqParam);
    }

    @NoCheckAuth
    @DeleteMapping("/logout")
    public ApiResp<Integer> logout() {
        return ApiResp.success("用户已退出");
    }


    @NoCheckAuth
    @PostMapping("/register")
    public ApiResp<String> register() {
        return ApiResp.success("用户登录成功");
    }
}