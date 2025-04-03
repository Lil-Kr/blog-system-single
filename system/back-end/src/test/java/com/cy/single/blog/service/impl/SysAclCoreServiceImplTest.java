package com.cy.single.blog.service.impl;

import com.cy.single.blog.pojo.entity.sys.SysAclData;
import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

class SysAclCoreServiceImplTest {

	SysAclCoreServiceImpl service = new SysAclCoreServiceImpl();

	@Test
	public void test1() {
		StringBuilder res = new StringBuilder();
		SysAclData aclData = SysAclData.builder()
			.id(0l)
			.aclId(2l)
			.status(0)
			.param("orgId, roleId")
			.operation(6) // 介于...之间
			.value1("abc")
			.value2("abc")
			.nextParamOp(0)
			.seq(0)
			.build();
		String operaSign = service.switchOperation(aclData.getOperation());

		List<String> paramList = Splitter.on(",").trimResults().omitEmptyStrings().splitToList(aclData.getParam());

		/**
		 * 拼接 sql
		 */
		paramList.forEach(param -> {
			res.append(param + " ");
			// 特殊处理 [介于...之间]
			if (aclData.getOperation() == 6) {
				res.append("between " + aclData.getValue1() + " and " + aclData.getValue2() + " and ");
			} else if (aclData.getOperation() == 5) {
				res.append(operaSign + " (");
				res.append(Joiner.on(",").join(Splitter.on(",").trimResults().split(aclData.getValue1())));
				res.append(") ");
				res.append("and ");
			} else {
				res.append(operaSign + " " + aclData.getValue1() + " and ");
			}
		});

		String result = Joiner.on(" and ")
			.join(Splitter.on(" and ")
				.trimResults() // 去除每个分隔项的前后空格
				.omitEmptyStrings() // 忽略空字符串
				.split(res)).trim(); // 去掉最后的空格

		System.out.println(result);
		Assertions.assertEquals("orgId between abc and abc and roleId between abc and abc", result);
	}

	@Test
	public void test2() {
		StringBuilder res = new StringBuilder();
		SysAclData aclData = SysAclData.builder()
			.id(0l)
			.aclId(2l)
			.status(0)
			.param("orgId, roleId")
			.operation(1) // 单个值
			.value1("abc")
			.value2("")
			.nextParamOp(0)
			.seq(0)
			.build();

		String operaSign = service.switchOperation(aclData.getOperation());
		List<String> paramList = Splitter.on(",").trimResults().omitEmptyStrings().splitToList(aclData.getParam());

		/**
		 * 拼接 sql
		 */
		paramList.forEach(param -> {
			res.append(param + " ");
			// 特殊处理 [介于...之间]
			if (aclData.getOperation() == 6) {
				res.append("between " + aclData.getValue1() + " and " + aclData.getValue2() + " and ");
			} else if (aclData.getOperation() == 5) {
				res.append(operaSign + " (");
				res.append(Joiner.on(",").join(Splitter.on(",").trimResults().split(aclData.getValue1())));
				res.append(") ");
				res.append("and ");
			} else {
				res.append(operaSign + " " + aclData.getValue1() + " and ");
			}
		});

		String result = Joiner.on(" and ")
			.join(Splitter.on(" and ")
				.trimResults() // 去除每个分隔项的前后空格
				.omitEmptyStrings() // 忽略空字符串
				.split(res)).trim(); // 去掉最后的空格

		System.out.println(result);
		Assertions.assertEquals("orgId > abc and roleId > abc", result);
	}

	@Test
	public void test3() {
		StringBuilder res = new StringBuilder();
		SysAclData aclData = SysAclData.builder()
			.id(0l)
			.aclId(2l)
			.status(0)
			.param("orgId, roleId")
			.operation(5) // 包含
			.value1("1334005930790096896, 1334023597823496192")
			.value2("")
			.nextParamOp(0)
			.seq(0)
			.build();

		String operaSign = service.switchOperation(aclData.getOperation());
		List<String> paramList = Splitter.on(",").trimResults().omitEmptyStrings().splitToList(aclData.getParam());

		/**
		 * 拼接 sql
		 */
		paramList.forEach(param -> {
			res.append(param + " ");
			// 特殊处理 [介于...之间]
			if (aclData.getOperation() == 6) {
				res.append("between " + aclData.getValue1() + " and " + aclData.getValue2() + " and ");
			} else if (aclData.getOperation() == 5) {
				res.append(operaSign + " (");
				res.append(Joiner.on(",").join(Splitter.on(",").trimResults().split(aclData.getValue1())));
				res.append(") ");
				res.append("and ");
			} else {
				res.append(operaSign + " " + aclData.getValue1() + " and ");
			}
		});

		String result = Joiner.on(" and ")
			.join(Splitter.on(" and ")
				.trimResults() // 去除每个分隔项的前后空格
				.omitEmptyStrings() // 忽略空字符串
				.split(res)).trim(); // 去掉最后的空格

		System.out.println(result);
		Assertions.assertEquals("orgId in (1334005930790096896,1334023597823496192) and roleId in (1334005930790096896,1334023597823496192)", result);
	}
}