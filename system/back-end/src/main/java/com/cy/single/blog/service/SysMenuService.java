package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.sys.SysMenu;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/18
 * @Description: 菜单
 */
public interface SysMenuService {

	// 获取当前用户的菜单数据
	ApiResp<List<SysMenu>> menuTree();
}
