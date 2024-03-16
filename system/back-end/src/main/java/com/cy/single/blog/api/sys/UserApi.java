package com.cy.single.blog.api.sys;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.SysUser;
import com.cy.single.blog.pojo.req.user.UserSaveReq;
import com.cy.single.blog.service.SysUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
@RestController
@RequestMapping("/sys/user")
@Slf4j
public class UserApi {

    @Autowired
    private SysUserService userService;

    @GetMapping("/getUserById/{id}")
    public ApiResp<SysUser> getUserById(@PathVariable("id") Long id) {
        SysUser user = userService.getUserById(id);
        return ApiResp.success(user);
    }

    @GetMapping("/getUserBySurrogateId/{surrogateId}")
    public ApiResp<SysUser> getUserBySurrogateId(@PathVariable("surrogateId") Long surrogateId) {
        SysUser user = userService.getUserBySurrogateId(surrogateId);
        return ApiResp.success(user);
    }

    @PostMapping("/addUser")
    public ApiResp<String> addUser(@RequestBody @Valid UserSaveReq reqParam) {
        System.out.println("addUser");
        return ApiResp.success();
    }

    @PostMapping("/editUser")
    public ApiResp<String> editUser(@RequestBody @Valid UserSaveReq reqParam) {
        System.out.println("editUser");
        return ApiResp.success();
    }
}
