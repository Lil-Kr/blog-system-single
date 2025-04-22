package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.dto.sys.org.OrgLevelDto;
import com.cy.single.blog.pojo.req.sys.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.sys.org.OrgPageReq;
import com.cy.single.blog.pojo.req.sys.org.OrgReq;
import com.cy.single.blog.pojo.resp.sys.org.SysOrgResp;
import com.cy.single.blog.service.SysOrgService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

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
	private SysOrgService orgService;

	/**
	 * add org info
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("add")
	public ApiResp<String> add(@RequestBody @Validated({OrgReq.GroupAdd.class}) OrgReq req) {
		return orgService.add(req);
	}

	/**
	 * edit org info
	 * @param req
	 * @return
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("edit")
	public ApiResp<String> edit(@RequestBody @Validated({OrgReq.GroupEdit.class}) OrgReq req) {
		return orgService.edit(req);
	}

	/**
	 * retrieve org info by tree struct
	 * @return
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("orgTreeList")
	public ApiResp<List<OrgLevelDto>> orgTreeList() {
		List<OrgLevelDto> orgLevelList = orgService.orgTree();
		return ApiResp.success(orgLevelList);
	}

	/**
	 * retrieve page org list
	 * @return
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("/pageList")
	public ApiResp<PageResult<SysOrgResp>> pageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) OrgPageReq req) {
		PageResult<SysOrgResp> list = orgService.pageList(req);
		return ApiResp.success(list);
	}

	@RecordLogger
	@CheckAuth
	@PostMapping("list")
	public ApiResp<List<SysOrgResp>> list(@RequestBody OrgListAllReq req) {
		List<SysOrgResp> list = orgService.list(req);
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
	public ApiResp<String> delete(@RequestParam("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
		return orgService.delete(surrogateId);
	}
}