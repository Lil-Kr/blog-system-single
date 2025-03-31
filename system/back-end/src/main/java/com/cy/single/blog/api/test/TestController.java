package com.cy.single.blog.api.test;

import com.alibaba.fastjson2.JSONObject;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.service.SysAclCoreService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/31
 * @Description:
 */
@Slf4j
@RestController
@RequestMapping("/test")
public class TestController {

	@Autowired
	private SysAclCoreService aclCoreService;


	@GetMapping("/test1")
	public String test1() {
		SysUser user = RequestHolder.getCurrentUser();
		log.info(JSONObject.toJSONString(user));
		return "abc";
	}

	@GetMapping("/test2")
	public ApiResp<List<SysAcl>> test2() {
		List<SysAcl> userAclList = aclCoreService.getCurrentUserAclList();
		return ApiResp.success(userAclList);
	}

	@GetMapping("/test3")
	public ApiResp<String> test3() {
		Long surrogateId = RequestHolder.getCurrentUser().getSurrogateId();

		return ApiResp.success("token立即失效");
	}
}