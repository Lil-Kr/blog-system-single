package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.req.user.UserRegisterReq;
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

    @RecordLogger
    @PutMapping("/login")
    public ApiResp<String> login(@RequestBody @Valid UserLoginAdminReq req) {
        return userService.adminLogin(req);
    }

    @DeleteMapping("/logout")
    @CheckAuth
    public ApiResp<Integer> logout() {
        // 移除用户
        RequestHolder.remove();
        return ApiResp.success("用户已退出");
    }

    @PostMapping("/register")
    @CheckAuth
    public ApiResp<Integer> register(@RequestBody @Valid UserRegisterReq req) {
        return userService.registerAdmin(req);
    }
}