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
import static com.cy.single.blog.common.constants.ResponseConstant.*;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: user api
 */
@RestController
@RequestMapping("/sys/user")
@Slf4j
public class UserController {

	@Autowired
	private SysUserService userService;

	@CheckAuth
	@RecordLogger
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

	@CheckAuth
	@PostMapping("/register")
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
	public ApiResp<String> addUser(@RequestBody @Valid UserSaveReq req) {
		System.out.println("addUser");
		return ApiResp.success();
	}

	@PostMapping("/editUser")
	public ApiResp<String> editUser(@RequestBody @Valid UserSaveReq req) {
		System.out.println("editUser");
		return ApiResp.success();
	}
}
