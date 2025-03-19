package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysAclModuleMapper;
import com.cy.single.blog.pojo.dto.sys.acl.AclDto;
import com.cy.single.blog.pojo.dto.sys.aclmodule.AclModuleDto;
import com.cy.single.blog.pojo.entity.sys.SysMenu;
import com.cy.single.blog.service.*;
import com.google.common.collect.Lists;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/18
 * @Description:
 */
@Service
public class SysMenuServiceImpl implements SysMenuService {

	@Autowired
	private MessageLangService msgService;

	@Autowired
	private SysRoleService roleService;

	@Autowired
	private SysTreeService treeService;

	@Autowired
	private SysAclCoreService coreService;

	@Autowired
	private SysAclModuleMapper aclModuleMapper;

	/**
	 * 获取用户-菜单
	 * @return
	 */
	@Override
	public ApiResp<List<SysMenu>> menuTree() {
		/**
		 * 1. 获取当前用户对应的菜单权限
		 */
		Long userId = RequestHolder.getCurrentUser().getSurrogateId();
		List<AclModuleDto> aclModuleLevelDtoList = treeService.userAclTree(userId);

		List<SysMenu> menuList = changeTreeToMenu(aclModuleLevelDtoList);
		return ApiResp.success(menuList);
	}

	/**
	 *
	 * @param aclModuleDtoList
	 * @return
	 */
	private List<SysMenu> changeTreeToMenu(List<AclModuleDto> aclModuleDtoList) {
		List<SysMenu> menuList = Lists.newArrayList();
		if (CollectionUtils.isEmpty(aclModuleDtoList)) {
			return menuList;
		}

		for (AclModuleDto aclModuleDto : aclModuleDtoList) {
			// 检查当前模块是否有满足条件的权限点
			boolean hasValidAcl = aclModuleDto.getAclDtoList().stream()
				.anyMatch(acl -> acl.getType() == 1 && acl.isChecked() && acl.isHasAcl());

			// 如果没有满足条件的权限点, 跳过当前模块
			if (!hasValidAcl && CollectionUtils.isEmpty(aclModuleDto.getAclModuleDtoList())) {
				continue;
			}

			SysMenu menu = new SysMenu();

			/**
			 * case1: 当权限点有值, 权限模块为空时, 说明当前权限模块就是即将跳转的url, 并且没有下一级
			 */
			if (CollectionUtils.isNotEmpty(aclModuleDto.getAclDtoList())
				&& CollectionUtils.isEmpty(aclModuleDto.getAclModuleDtoList())) {
				AclDto aclDto = aclModuleDto.getAclDtoList().stream()
					.filter(acl -> acl.getType() == 1 && acl.isChecked() && acl.isHasAcl()) // 过滤条件
					.findAny()
					.orElse(null);

				if (aclDto != null) {
					menu.setKey(aclDto.getMenuUrl());
					menu.setTitle(aclDto.getMenuName());
					menu.setPath(aclDto.getMenuUrl());
					menuList.add(menu);
				}
			}

			/**
			 * case2: 当权限模块有值, 权限点为空时, 说明当前权限模块有子菜单, 需要递归处理
			 */
			if (CollectionUtils.isNotEmpty(aclModuleDto.getAclModuleDtoList())) {
				// 递归处理子菜单
				List<SysMenu> subMenuList = changeTreeToMenu(aclModuleDto.getAclModuleDtoList());

				// 如果子菜单列表不为空，才将当前模块作为父菜单
				if (CollectionUtils.isNotEmpty(subMenuList)) {
					menu.setKey(aclModuleDto.getName());
					menu.setTitle(aclModuleDto.getName());
					menu.setPath(""); // 没有具体的URL，设置为空
					menu.getChildren().addAll(subMenuList);
					menuList.add(menu);
				}
			}
		}
		return menuList;
	}

//	private List<SysMenu> changeTreeToMenu(List<AclModuleDto> aclModuleDtoList) {
//		List<SysMenu> menuList = Lists.newArrayList();
//		if (CollectionUtils.isEmpty(aclModuleDtoList)) {
//			return menuList;
//		}
//
//		for (AclModuleDto aclModuleDto : aclModuleDtoList) {
//			// 检查当前模块是否有满足条件的权限点
//			boolean hasValidAcl = aclModuleDto.getAclDtoList().stream()
//				.anyMatch(acl -> acl.getType() == 1 && acl.isChecked() && acl.isHasAcl());
//
//			// 如果没有满足条件的权限点，跳过当前模块
//			if (!hasValidAcl && CollectionUtils.isEmpty(aclModuleDto.getAclModuleDtoList())) {
//				continue;
//			}
//
//			SysMenu menu = new SysMenu();
//
//			/**
//			 * case1: 当权限点有值, 权限模块为空时, 说明当前权限模块就是即将跳转的url, 并且没有下一级
//			 */
//			if (CollectionUtils.isNotEmpty(aclModuleDto.getAclDtoList())
//				&& CollectionUtils.isEmpty(aclModuleDto.getAclModuleDtoList())) {
//				AclDto aclDto = aclModuleDto.getAclDtoList().stream()
//					.filter(acl -> acl.getType() == 1 && acl.isChecked() && acl.isHasAcl()) // 过滤条件
//					.findAny()
//					.orElse(null);
//
//				if (aclDto != null) {
//					menu.setKey(aclDto.getMenuUrl()); // key 设置为 menuUrl
//					menu.setTitle(aclDto.getMenuName());
//					menu.setPath(aclDto.getMenuUrl());
//					menuList.add(menu);
//				}
//			}
//
//			/**
//			 * case2: 当权限模块有值, 权限点为空时, 说明当前权限模块有子菜单, 需要递归处理
//			 */
//			if (CollectionUtils.isNotEmpty(aclModuleDto.getAclModuleDtoList())) {
//				// 递归处理子菜单
//				List<SysMenu> subMenuList = changeTreeToMenu(aclModuleDto.getAclModuleDtoList());
//
//				// 如果子菜单列表不为空，才将当前模块作为父菜单
//				if (!subMenuList.isEmpty()) {
//					// 父级菜单的 key 和 path 设置为模块的路径
//					String modulePath = "/admin/" + aclModuleDto.getName().toLowerCase();
//					menu.setKey(modulePath);
//					menu.setTitle(aclModuleDto.getName());
//					menu.setPath(modulePath);
//					menu.getChildren().addAll(subMenuList);
//					menuList.add(menu);
//				}
//			}
//		}
//		return menuList;
//	}
}
