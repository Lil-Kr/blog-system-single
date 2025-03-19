package com.cy.single.blog.pojo.entity.sys;

import com.google.common.collect.Lists;
import lombok.Data;
import lombok.ToString;

import java.util.List;
import java.util.Objects;

/**
 * @Author: Lil-K
 * @Date: 2025/3/18
 * @Description:
 */
@Data
@ToString
public class SysMenu {

	private String key;

	private String title; // mapping -> menuName

	private String path; // mapping -> menuUrl

	private List<SysMenu> children = Lists.newArrayList();

	public void addSubMenu(SysMenu menu) {
		if (Objects.nonNull(menu)) {
			children.add(menu);
		}
	}
}
