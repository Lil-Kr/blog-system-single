package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.dao.SysDictDetailMapper;
import com.cy.single.blog.service.SysDictService;
import com.cy.single.blog.pojo.resp.sys.dic.SysDictDetailResp;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

@SpringBootTest
class SysDictServiceImplTest {

	@Autowired
	private SysDictDetailMapper dictDetailMapper;

	@Autowired
	private SysDictService dictService;

	@Test
	public void test1() {
		ApiResp<Map<String, List<SysDictDetailResp>>> mapApiResp = dictService.dictDetailMapping();
		Map<String, List<SysDictDetailResp>> data = mapApiResp.getData();
	}

}