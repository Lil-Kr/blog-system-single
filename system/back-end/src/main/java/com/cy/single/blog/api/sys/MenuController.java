package com.cy.single.blog.api.sys;

import com.cy.single.blog.service.SysAclModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: Lil-K
 * @Date: 2025/3/16
 * @Description:
 */
@RestController
@RequestMapping("/sys/menu")
public class MenuController {

	@Autowired
	private SysAclModuleService aclModuleService;


}