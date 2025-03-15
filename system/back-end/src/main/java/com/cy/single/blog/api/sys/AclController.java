package com.cy.single.blog.api.sys;


import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.acl.AclPageReq;
import com.cy.single.blog.pojo.req.acl.AclReq;
import com.cy.single.blog.pojo.req.roleacl.RoleAclSaveReq;
import com.cy.single.blog.pojo.req.roleuser.RoleUserReq;
import com.cy.single.blog.pojo.vo.sys.acl.SysAclVO;
import com.cy.single.blog.service.SysAclService;
import com.cy.single.blog.service.SysRoleAclService;
import com.cy.single.blog.service.SysRoleUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: 权限管理模块
 */
@RestController
@RequestMapping("/sys/acl")
@Slf4j
public class AclController {

	@Autowired
	private SysAclService aclService;

	@Autowired
	private SysRoleUserService roleUserService;

	@Autowired
	private SysRoleAclService roleAclService;

	/**
	 * 分页查询权限点列表
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/pageList")
	public ApiResp<PageResult<SysAclVO>> pageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) AclPageReq req) {
		PageResult<SysAclVO> res = aclService.pageList(req);
		return ApiResp.success(res);
	}

	/**
	 * 权限点信息保存
	 * @param req
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/addAcl")
	public ApiResp<String> addAcl(@RequestBody @Valid AclReq req) {
		return aclService.addAcl(req);
	}

	/**
	 * 修改权限点信息
	 * @param req
	 * @return
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/editAcl")
	public ApiResp<String> editAcl(@RequestBody @Valid AclReq req) {
		return aclService.editAcl(req);
	}

	/**
	 * 获取权限点分配的用户角色
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/acls")
	public ApiResp<ConcurrentHashMap<String, Object>> acls(@RequestBody @Validated({AclReq.GroupAcls.class}) AclReq req) {
		return aclService.acls(req);
	}
//
//	/**
//	 * 获取角色分配的用户列表
//	 * @param req
//	 * @return
//	 * @throws Exception
//	 */
//	@CheckAuth
//	@RecordLogger
//	@PostMapping("/roleUserList")
//	public ApiResp<Map<String, List<SysUserVO>>> roleUserList(@RequestBody @Validated({RoleUserReq.GroupRoleUserPageList.class}) RoleUserReq req) {
//		return roleUserService.roleUserList(req);
//	}

	/**
	 * 维护[角色-用户]关系接口
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/changeRoleUsers")
	public ApiResp<String> changeRoleUsers(@RequestBody @Validated({RoleUserReq.GroupChangeRoleUsers.class}) RoleUserReq req) {
		return roleUserService.updateRoleUsers(req);
	}

	/**
	 * 修改[角色-权限]关系
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@CheckAuth
	@RecordLogger
	@PostMapping("/changeRoleAcls")
	public ApiResp<String> changeRoleAcls(@RequestBody @Validated({RoleAclSaveReq.GroupUpdateRoleAcls.class}) RoleAclSaveReq req) {
		return roleAclService.updateRoleAcls(req);
	}

	/**
	 * 删除权限点
	 * @param surrogateId
	 * @return
	 */
	@RecordLogger
	@CheckAuth
	@DeleteMapping("/delete")
	public ApiResp<String> delete(@RequestParam("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
		return aclService.delete(surrogateId);
	}
}

