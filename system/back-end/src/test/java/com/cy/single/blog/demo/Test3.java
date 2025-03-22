package com.cy.single.blog.demo;

import com.alibaba.fastjson2.JSONArray;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import org.apache.commons.collections4.CollectionUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @Author: Lil-K
 * @Date: 2025/3/18
 * @Description:
 */
public class Test3 {

	@Test
	public void test1() {
		List<SysAcl> testList = new ArrayList<>();
		List<String> btnSignList = testList.stream().map(SysAcl::getBtnSign).collect(Collectors.toList());
		Assertions.assertEquals("[]", JSONArray.toJSONString(btnSignList));
	}

	@Test
	public void test2() {
		List<SysAcl> userAclList = new ArrayList<>();
		List<String> btnSignList = Optional.of(userAclList)
			.filter(CollectionUtils::isNotEmpty)
			.map(list -> list.stream().map(SysAcl::getBtnSign).collect(Collectors.toList()))
			.orElseGet(ArrayList::new);

		Assertions.assertEquals("[]", JSONArray.toJSONString(btnSignList));
	}

	@Test
	public void test3() {
		List<SysAcl> userAclList = null;
		List<String> btnSignList = Optional.ofNullable(userAclList)
			.filter(CollectionUtils::isNotEmpty)
			.map(list -> list.stream().map(SysAcl::getBtnSign).collect(Collectors.toList()))
			.orElseGet(ArrayList::new);

		Assertions.assertEquals("[]", JSONArray.toJSONString(btnSignList));
	}
}
