package com.cy.single.blog.api.sys;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.req.org.OrgParam;
import com.cy.single.blog.service.SysOrgService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Objects;

/**
 * @Author: Lil-K
 * @Date: 2025/3/3
 * @Description: org api
 */
@RestController
@RequestMapping("/sys/org")
@Slf4j
public class OrgController {

	@Autowired
	private SysOrgService sysOrgService;

	/**
	 * 保存组织
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@PostMapping("save")
	public ApiResp<String> save(@RequestBody @Valid OrgParam param) throws Exception {

		if (Objects.nonNull(param.getId()) && Objects.nonNull(param.getSurrogateId())) {// update
			return sysOrgService.edit(param);
		}else { // insert
			return sysOrgService.add(param);
		}
	}


	/**
	 * 新增组织信息
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@PostMapping("add")
	public ApiResp add(@RequestBody @Valid OrgParam param) throws Exception {
		return sysOrgService.add(param);
	}

	@PostMapping("edit")
	public ApiResp edit(@RequestBody @Validated({OrgParam.GroupEdit.class}) OrgParam param) throws Exception {
		return sysOrgService.edit(param);
	}
}