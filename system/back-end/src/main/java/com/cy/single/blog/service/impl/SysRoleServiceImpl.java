package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysRoleAclMapper;
import com.cy.single.blog.dao.SysRoleMapper;
import com.cy.single.blog.dao.SysRoleUserMapper;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.pojo.req.role.RoleListPageReq;
import com.cy.single.blog.pojo.req.role.RoleSaveReq;
import com.cy.single.blog.pojo.vo.sys.role.SysRoleVO;
import com.cy.single.blog.service.MessageLangService;
import com.cy.single.blog.service.SysRoleService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.common.constants.CommonConstants.LANG_ZH;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2025/3/4
 * @Description: role service
 */
@Service
public class SysRoleServiceImpl implements SysRoleService {

	@Autowired
	private MessageLangService msgService;

	@Autowired
	private SysRoleMapper roleMapper;

	@Autowired
	private SysRoleUserMapper roleUserMapper;

	@Autowired
	private SysRoleAclMapper roleAclMapper;

	@Override
	public PageResult<SysRoleVO> pageList(RoleListPageReq req) {
		List<SysRoleVO> roleList = roleMapper.pageRoleList(req);
		Integer count = roleMapper.countRolePage(req);
		if (CollectionUtils.isEmpty(roleList)) {
			return new PageResult<>(new ArrayList<>(0), 0);
		}else {
			return new PageResult<>(roleList, count);
		}
	}

	/**
	 * 添加
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<String> add(RoleSaveReq req) {
		if (checkExit(req.getRoleId(), req.getName(), req.getType())) {
			return ApiResp.failure(INFO_EXIST);
		}

		/**
		 * check supper admin is or not exist
		 */
		if (checkSupperAdminExist() && req.getType() == 1) {
			return ApiResp.failure(msgService.getGreetingMessage(LANG_ZH, "sys.role.api.resp.msg2"));
		}

		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeNow();// 当前时间
		SysRole role = SysRole.builder()
			.surrogateId(surrogateId)
			.name(req.getName())
			.type(req.getType())
			.remark(req.getRemark())
			.deleted(0)
			.status(req.getStatus())
			.creatorId(RequestHolder.getCurrentUser().getSurrogateId())
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.createTime(currentTime)
			.updateTime(currentTime)
			.build();

		int insert = roleMapper.insert(role);
		if (insert >= 1) {
			return ApiResp.success();
		} else {
			return ApiResp.failure(SAVE_ERROR);
		}
	}

	/**
	 * 根据类型姓名检查同一类型下是否有相同名称的角色
	 * @param surrogateId 父id
	 * @param name 角色名称
	 */
	protected boolean checkExit(Long surrogateId, String name, Integer type) {
		QueryWrapper<SysRole> query = new QueryWrapper<>();
		if (Objects.nonNull(surrogateId)) {
			query.eq("surrogate_id", surrogateId);
		}
		query.eq("name", name);
		query.eq("type", type);
		SysRole before = roleMapper.selectOne(query);
		if (Objects.isNull(before)) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * check supper admin is or not exist
	 * @return
	 */
	@Override
	public boolean checkSupperAdminExist() {
		/**
		 * supper admin must be only one
		 */
		QueryWrapper<SysRole> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("type", 1);
		SysRole role = roleMapper.selectOne(queryWrapper);
		if (Objects.isNull(role))
			return false;
		else
			return true;
	}

	/**
	 * 编辑角色信息
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<String> edit(RoleSaveReq req) {
		QueryWrapper<SysRole> query = new QueryWrapper<>();
		query.eq("surrogate_id", req.getRoleId());
		SysRole before = roleMapper.selectOne(query);
		if (Objects.isNull(before)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}

		/**
		 * supper admin must be only one
		 */
		if (before.getType() == 1 && req.getType() != 1) {
			return ApiResp.failure(msgService.getGreetingMessage(LANG_ZH, "sys.role.api.resp.msg2"));
		}

		if (before.getType() != 1 && req.getType() == 1 && checkSupperAdminExist()) {
			return ApiResp.failure(msgService.getGreetingMessage(LANG_ZH, "sys.role.api.resp.msg2"));
		}

		SysRole after = SysRole.builder()
			.id(before.getId())
			.surrogateId(before.getSurrogateId())
			.name(req.getName())
			.type(req.getType())
			.remark(req.getRemark())
			.status(req.getStatus())
			.operateIp("127.0.0.1")
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.updateTime(DateUtil.localDateTimeNow())
			.build();

		int update = roleMapper.update(after, query);
		if (update >= 1) {
			return ApiResp.success();
		}else {
			return ApiResp.failure(EDITE_ERROR);
		}
	}

	/**
	 * freeze role info
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<String> freeze(RoleSaveReq req) {
		QueryWrapper<SysRole> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("surrogate_id", req.getRoleId());
		SysRole before = roleMapper.selectOne(queryWrapper);
		if (before.getType() == 1) {
			return ApiResp.failure(msgService.getGreetingMessage(LANG_ZH, "sys.role.api.resp.msg4"));
		}

		UpdateWrapper<SysRole> updateWrapper = new UpdateWrapper<>();
		updateWrapper.eq("surrogate_id", req.getRoleId());
		SysRole build = SysRole.builder()
			.status(req.getStatus())
			.operateIp("127.0.0.1")
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.updateTime(DateUtil.localDateTimeNow())
			.build();

		int update = roleMapper.update(build, updateWrapper);
		if (update >= 1) {
			return ApiResp.success();
		} else {
			return ApiResp.failure(OPERATE_ERROR);
		}
	}

	@Override
	public ApiResp<String> delete(Long surrogateId) {
		QueryWrapper queryRoleUser = new QueryWrapper<>();
		queryRoleUser.eq("role_id", surrogateId);
		Long countRoleUser = roleUserMapper.selectCount(queryRoleUser);
		if (countRoleUser >= 1) return ApiResp.failure(msgService.getGreetingMessage(LANG_ZH, "sys.role.api.resp.msg3"));

		QueryWrapper queryRoleAcl = new QueryWrapper<>();
		queryRoleAcl.eq("role_id", surrogateId);
		Long countRoleAcl = roleAclMapper.selectCount(queryRoleAcl);
		if (countRoleAcl >= 1) return ApiResp.failure(INFO_EXIST);

		Integer delete = roleMapper.deleteBySurrogateId(surrogateId);
		if (delete >= 1) {
			return ApiResp.success();
		} else {
			return ApiResp.failure(DEL_ERROR);
		}
	}

}
