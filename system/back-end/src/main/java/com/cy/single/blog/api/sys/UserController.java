package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.req.user.UserRegisterReq;
import com.cy.single.blog.pojo.req.user.UserSaveReq;
import com.cy.single.blog.service.SysUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.cy.single.blog.common.constants.ResponseConstant.LOGOUT_SUCCESS;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description: user api
 */
@RestController
@RequestMapping("/sys/user")
@Slf4j
public class UserController {

    @Autowired
    private SysUserService userService;

    @RecordLogger
    @CheckAuth
    @PutMapping("/login")
    public ApiResp<String> login(@RequestBody @Valid UserLoginAdminReq req) {
        return userService.adminLogin(req);
    }

    @CheckAuth
    @RecordLogger
    @DeleteMapping("/logout")
    public ApiResp<Integer> logout() {
        // 移除用户
        RequestHolder.remove();
        return ApiResp.success(LOGOUT_SUCCESS);
    }

    @PostMapping("/register")
    @CheckAuth
    public ApiResp<Integer> register(@RequestBody @Valid UserRegisterReq req) {
        return userService.registerAdmin(req);
    }

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
