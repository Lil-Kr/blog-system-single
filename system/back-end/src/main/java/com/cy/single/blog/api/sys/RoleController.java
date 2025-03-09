package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.dto.sys.aclmodule.AclModuleDto;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.pojo.req.role.RoleListPageReq;
import com.cy.single.blog.pojo.req.role.RoleSaveReq;
import com.cy.single.blog.pojo.req.roleacl.RoleAclSaveReq;
import com.cy.single.blog.pojo.req.roleuser.RoleUserReq;
import com.cy.single.blog.service.SysRoleAclService;
import com.cy.single.blog.service.SysRoleService;
import com.cy.single.blog.service.SysRoleUserService;
import com.cy.single.blog.service.SysTreeService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import static com.cy.single.blog.common.constants.ResponseConstant.ROLE_TREE_INFO;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: role api
 */
@RestController
@RequestMapping("/sys/role")
@Slf4j
public class RoleController {

	@Autowired
	private SysRoleService roleService;

	@Autowired
	private SysTreeService treeService;

	@Autowired
	private SysRoleUserService roleUserService;

	@Autowired
	private SysRoleAclService roleAclService;

	/**
	 * page role info list
	 * @param req
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/pageList")
	public ApiResp<PageResult<SysRole>> pageList (@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) RoleListPageReq req) {
		PageResult<SysRole> res = roleService.pageList(req);
		return ApiResp.success(res);
	}

	/**
	 * add role info
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/add")
	public ApiResp<String> add (@RequestBody @Validated({RoleSaveReq.GroupAdd.class}) RoleSaveReq req) {
		return roleService.add(req);
	}

	/**
	 * edit role info
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/edit")
	public ApiResp<String> edit (@RequestBody @Validated({RoleSaveReq.GroupEdite.class}) RoleSaveReq req) throws Exception {
		return roleService.edit(req);
	}

	/**
	 * freeze role info
	 * @param req
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/freeze")
	public ApiResp<String> freeze (@RequestBody @Validated({RoleSaveReq.GroupFreeze.class}) RoleSaveReq req) {
		return roleService.freeze(req);
	}

	/**
	 * delete role info
	 * @param surrogateId
	 */
	@CheckAuth
	@RecordLogger
	@DeleteMapping("/delete")
	public ApiResp delete (@RequestParam("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
		return roleService.delete(surrogateId);
	}

	/**
	 * 获取当前用户所拥有的[角色-权限]树
	 * retrieve current user`s [role-acl] tree
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/roleAclTree")
	public ApiResp<List<AclModuleDto>> roleAclTree(@RequestBody @Validated({RoleSaveReq.GroupTreeOrDel.class}) RoleSaveReq req) {
		List<AclModuleDto> aclModuleDtoList = treeService.roleAclTree(req.getSurrogateId());
		if (CollectionUtils.isNotEmpty(aclModuleDtoList)) {
			return ApiResp.success(aclModuleDtoList);
		}else {
			return ApiResp.failure(ROLE_TREE_INFO);
		}
	}

	/**
	 * 修改角色对应的权限点
	 * update
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/changeRoleAcls")
	public ApiResp changeRoleAcls(@RequestBody @Validated({RoleAclSaveReq.GroupChangeAcls.class}) RoleAclSaveReq req) {
		return roleAclService.changeRoleAcls(req);
	}

	/**
	 * 获取[角色-用户]列表
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/roleUserList")
	public ApiResp roleUserList(@RequestBody @Validated({RoleUserReq.GroupRoleUserPageList.class}) RoleUserReq req) {
		return roleUserService.roleUserList(req);
	}

	/**
	 * 维护[角色-用户]关系接口
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/updateRoleUsers")
	public ApiResp<String> updateRoleUsers(@RequestBody @Validated({RoleUserReq.GroupChangeRoleUsers.class}) RoleUserReq req) {
		return roleUserService.updateRoleUsers(req);
	}
}
