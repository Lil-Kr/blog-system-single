package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.dto.org.OrgLevelDto;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.pojo.req.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.org.OrgReq;
import com.cy.single.blog.pojo.resp.org.SysOrgVO;
import com.cy.single.blog.service.SysOrgService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
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
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("save")
	public ApiResp<String> save(@RequestBody @Valid OrgReq req) throws Exception {
		if (Objects.nonNull(req.getId()) && Objects.nonNull(req.getSurrogateId())) {// update
			return sysOrgService.edit(req);
		}else { // insert
			return sysOrgService.add(req);
		}
	}

	/**
	 * 新增组织信息
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("add")
	public ApiResp add(@RequestBody @Valid OrgReq req) throws Exception {
		return sysOrgService.add(req);
	}

	@RecordLogger
	@CheckAuth
	@PostMapping("edit")
	public ApiResp edit(@RequestBody @Validated({OrgReq.GroupEdit.class}) OrgReq req) throws Exception {
		return sysOrgService.edit(req);
	}

	/**
	 * retrieve org info by tree struct
	 * @return
	 * @throws Exception
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("orgTreeList")
	public ApiResp<List<OrgLevelDto>> orgTreeList() throws Exception {
		List<OrgLevelDto> orgLevelList = sysOrgService.orgTree();
		return ApiResp.success(orgLevelList);
	}

	/**
	 * retrieve page org list
	 * @return
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("pageOrgList")
	public ApiResp<PageResult<SysOrgVO>> pageOrgList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) OrgListAllReq req) {
		PageResult<SysOrgVO> list = sysOrgService.pageOrgList(req);
		return ApiResp.success(list);
	}

	/**
	 * retrieve all org list
	 * @return
	 * @throws Exception
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("list")
	public ApiResp<PageResult<SysOrg>> list(@RequestBody @Valid OrgListAllReq req) throws Exception {
		PageResult<SysOrg> list = sysOrgService.list(req);
		return ApiResp.success(list);
	}

	/**
	 * delete org
	 * @param surrogateId
	 * @return
	 * @throws Exception
	 */
	@RecordLogger
	@CheckAuth
	@DeleteMapping("delete")
	public ApiResp delete(@RequestParam("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
		return sysOrgService.delete(surrogateId);
	}
}