package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.dto.org.OrgLevelDto;
import com.cy.single.blog.pojo.req.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.org.OrgPageReq;
import com.cy.single.blog.pojo.req.org.OrgReq;
import com.cy.single.blog.pojo.vo.sys.org.SysOrgVO;
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
	 * save org list
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("save")
	public ApiResp<String> save(@RequestBody @Valid OrgReq req) {
		if (Objects.nonNull(req.getSurrogateId())) {// update
			return sysOrgService.edit(req);
		}else { // insert
			return sysOrgService.add(req);
		}
	}

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
		return sysOrgService.add(req);
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
		return sysOrgService.edit(req);
	}

	/**
	 * retrieve org info by tree struct
	 * @return
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("orgTreeList")
	public ApiResp<List<OrgLevelDto>> orgTreeList() {
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
	public ApiResp<PageResult<SysOrgVO>> pageOrgList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) OrgPageReq req) {
		PageResult<SysOrgVO> list = sysOrgService.pageOrgList(req);
		return ApiResp.success(list);
	}

	@RecordLogger
	@CheckAuth
	@PostMapping("list")
	public ApiResp<List<SysOrgVO>> list(@RequestBody OrgListAllReq req) {
		List<SysOrgVO> list = sysOrgService.list(req);
		return ApiResp.success(list);
	}

	/**
	 *
	 * @return
	 */
	@RecordLogger
	@CheckAuth
	@PostMapping("pageChildOrgList")
	public ApiResp<PageResult<SysOrgVO>> pageChildOrgList(@RequestBody @Validated({OrgPageReq.GroupChildOrgList.class, BasePageReq.GroupPageQuery.class}) OrgPageReq req) {
		PageResult<SysOrgVO> list = sysOrgService.pageChildOrgList(req);
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