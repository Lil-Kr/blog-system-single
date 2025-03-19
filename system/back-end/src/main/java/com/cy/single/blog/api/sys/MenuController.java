package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.sys.SysMenu;
import com.cy.single.blog.service.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/16
 * @Description: 菜单api
 */
@RestController
@RequestMapping("/sys/menu")
public class MenuController {

	@Autowired
	private SysMenuService menuService;

	/**
	 * 当前用户对应菜单,
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@GetMapping("/menuTree")
	public ApiResp<List<SysMenu>> menuTree() {
		return menuService.menuTree();
	}
}