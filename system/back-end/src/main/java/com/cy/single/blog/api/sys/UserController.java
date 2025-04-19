package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserListPageReq;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.req.user.UserRegisterReq;
import com.cy.single.blog.pojo.req.user.UserSaveReq;
import com.cy.single.blog.pojo.resp.sys.user.SysUserResp;
import com.cy.single.blog.service.MessageLangService;
import com.cy.single.blog.service.SysUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import static com.cy.single.blog.common.constants.CommonConstants.LANG_ZH;

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
	private MessageLangService messageLangService;

	@Autowired
	private SysUserService userService;

	/**
	 * admin login
	 * @param req
	 * @return
	 */
	@RecordLogger
	@PutMapping("/login")
	public ApiResp<SysUser> login(@RequestBody @Validated({UserLoginAdminReq.AdminLogin.class}) UserLoginAdminReq req) {
		return userService.adminLogin(req);
	}

	/**
	 * admin register
	 * @param req
	 * @return
	 */
	@RecordLogger
	@PostMapping("/register")
	public ApiResp<Integer> register(@RequestBody @Valid UserRegisterReq req) {
		return userService.registerAdmin(req);
	}

	@CheckAuth
	@RecordLogger
	@DeleteMapping("/logout")
	public ApiResp<Integer> logout() {
		// 移除用户
		RequestHolder.remove();
		return ApiResp.success(messageLangService.getGreetingMessage(LANG_ZH, "admin.logout.success"));
	}

	@CheckAuth
	@RecordLogger
	@PostMapping("/add")
	public ApiResp<String> add(@RequestBody @Validated({UserSaveReq.GroupAddUser.class}) UserSaveReq req) {
		return userService.add(req);
	}

	@CheckAuth
	@RecordLogger
	@PostMapping("/edit")
	public ApiResp<String> edit(@RequestBody @Validated({UserSaveReq.GroupEditUser.class}) UserSaveReq req) {
		return userService.edit(req);
	}

	@CheckAuth
	@RecordLogger
	@DeleteMapping("/delete")
	public ApiResp<String> delete(@RequestParam("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
		return userService.delete(surrogateId);
	}

	/**
	 * 获取后台用户数据
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@GetMapping("/get")
	public ApiResp<SysUser> get() {
		// 如果能通过验证, 说明AOP中token校验已经通过
		SysUser currentUser = RequestHolder.getCurrentUser();
		return ApiResp.success(currentUser);
	}

	/**
	 * 分页-查询用户列表
	 * @param req
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/pageList")
	public ApiResp<PageResult<SysUserResp>> pageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) UserListPageReq req) {
		PageResult<SysUserResp> result = userService.pageList(req);
		return ApiResp.success(result);
	}

}
