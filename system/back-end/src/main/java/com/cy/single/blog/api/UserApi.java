package com.cy.single.blog.api;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.SysUser;
import com.cy.single.blog.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
@RestController
@RequestMapping("/sys/user")
public class UserApi {

    @Autowired
    private SysUserService userService;

    @GetMapping("/getUserById/{id}")
    public ApiResp<SysUser> getUserById(@PathVariable("id") String id) {
        SysUser user = userService.getUserById(id);
        return ApiResp.success(user);
    }

}
