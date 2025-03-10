package com.cy.single.blog.api.sys;


import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleListReq;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleReq;
import com.cy.single.blog.pojo.vo.sys.aclmodule.SysAclModuleVO;
import com.cy.single.blog.service.SysAclModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

/**
 * 权限模块管理
 * @author Lil-Kr
 * @since 2020-11-28
 */
@RestController
@RequestMapping("/sys/aclModule")
public class AclModuleController {

	@Autowired
	private SysAclModuleService aclModuleService;

	/**
	 * 保存权限模块信息
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("save")
	public ApiResp<String> save(@RequestBody @Valid AclModuleReq req) throws Exception {
		if (Objects.isNull(req.getSurrogateId())) { // insert
			return aclModuleService.addAclModule(req);
		}else { // update
			return aclModuleService.editAclModule(req);
		}
	}

	/**
	 * 新增权限模块
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("addAclModule")
	public ApiResp addAclModule(@RequestBody @Validated({AclModuleReq.GroupAdd.class}) AclModuleReq req) {
		return aclModuleService.addAclModule(req);
	}

	/**
	 * 更新权限模块
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("editAclModule")
	public ApiResp<String> editAclModule(@RequestBody @Validated({AclModuleReq.GroupEdit.class}) AclModuleReq req) {
		return aclModuleService.editAclModule(req);
	}

	@CheckAuth
	@RecordLogger
	@GetMapping("getAclModule")
	public ApiResp<SysAclModuleVO> getAclModule(@RequestParam("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
		return aclModuleService.getAclModule(surrogateId);
	}

	/**
	 * 获得权限模块树
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("aclModuleTree")
	public ApiResp aclModuleTree() {
		return aclModuleService.aclModuleTree();
	}

	/**
	 * 删除权限模块功能
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@DeleteMapping("delete")
	public ApiResp delete(@RequestParam("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
		return aclModuleService.delete(surrogateId);
	}

	/**
	 *
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("aclModuleList")
	public ApiResp<List<SysAclModuleVO>> aclModuleList(@RequestBody AclModuleListReq req) {
		return aclModuleService.aclModuleList(req);
	}

}

