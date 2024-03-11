package com.cy.single.blog.api.sys;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.param.user.UserSaveParam;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: Lil-K
 * @Date: 2024/3/11
 * @Description: 后台登陆
 */
@RestController
@RequestMapping("/sys/admin")
public class AdminLoginApi {

    @PostMapping("/login")
    public ApiResp<String> login(@RequestBody @Validated({UserSaveParam.GroupAdminLogin.class}) UserSaveParam reqParam) {
        System.out.println("用户登录成功");
        return ApiResp.success("用户登录成功");
    }

    @PostMapping("/logout")
    public ApiResp<String> outLogin() {

        return ApiResp.success("用户已退出");
    }
}