package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.*;
import com.cy.single.blog.pojo.entity.sys.*;
import com.cy.single.blog.pojo.req.acl.AclPageReq;
import com.cy.single.blog.pojo.req.acl.AclReq;
import com.cy.single.blog.pojo.resp.sys.acl.SysAclResp;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.service.SysAclService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import static com.cy.single.blog.common.constants.CommonConstants.ACLM_PREV_INFO;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
@Service
@Slf4j
public class SysAclServiceImpl extends ServiceImpl<SysAclMapper, SysAcl> implements SysAclService {

	@Autowired
	private SysAclMapper aclMapper;

	@Autowired
	private SysRoleUserMapper roleUserMapper;

	@Autowired
	private SysRoleAclMapper roleAclMapper;

	@Autowired
	private SysRoleMapper roleMapper;

	@Autowired
	private SysUserMapper userMapper;

	@Autowired
	private CacheService cacheService;

	/**
	 * 添加权限点
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> add(AclReq req) {
		QueryWrapper<SysAcl> query = new QueryWrapper<>();
		query.eq("name", req.getName());
		query.eq("acl_module_id", req.getAclModuleId());
		if (aclMapper.selectCount(query) >= 1) {
			return ApiResp.warning(DATA_INFO_REPEAT);
		}

		/**
		 * 每个权限模块下只能配置一个菜单类型的权限点
		 */
		QueryWrapper<SysAcl> query2 = new QueryWrapper<>();
		// 菜单类型需要检查重复, 每个权限模块下只能有一个菜单类型权限点
		if (req.getType() == 1) {
			query2.eq("type", req.getType());
			query2.eq("acl_module_id", req.getAclModuleId());
			SysAcl acl = aclMapper.selectOne(query2);
			if (Objects.nonNull(acl)) {
				return ApiResp.warning("权限模块只能有一个菜单类型的权限");
			}
		}

		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeNow();// 当前时间
		SysAcl build = SysAcl.builder()
			.surrogateId(surrogateId)
			.number(ACLM_PREV_INFO + surrogateId)
			.name(req.getName())
			.aclModuleId(req.getAclModuleId())
			.url(req.getUrl())
			.menuName(StringUtils.isBlank(req.getMenuName()) ? "-" : req.getMenuName())
			.menuUrl(StringUtils.isBlank(req.getMenuUrl()) ? "-" : req.getMenuUrl())
			.btnSign(StringUtils.isBlank(req.getBtnSign()) ? "-" : req.getBtnSign())
			.type(req.getType())
			.status(req.getStatus())
			.seq(req.getSeq())
			.remark(req.getRemark())
			.creatorId(RequestHolder.getCurrentUser().getSurrogateId())
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.createTime(currentTime)
			.updateTime(currentTime)
			.build();

		int insert = aclMapper.insert(build);
		if (insert < 1) {
			return ApiResp.failure(SAVE_ERROR);
		}

		// 更新缓存
		cacheService.invalidAllUserAclCache();
		return ApiResp.success("添加权限点成功");
	}

	/**
	 * 更新权限点
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> edit(AclReq req) {
		QueryWrapper<SysAcl> query = new QueryWrapper<>();
		query.eq("surrogate_id", req.getSurrogateId());
		SysAcl before = aclMapper.selectOne(query);
		if (Objects.isNull(before)) {
			return ApiResp.warning(INFO_NOT_EXIST);
		}

		/**
		 * 检查当需要修改的权限点类型
		 */
		if (req.getType() == 1) {
			QueryWrapper<SysAcl> query1 = new QueryWrapper<>();
			query1.eq("acl_module_id", req.getAclModuleId());
			query1.eq("type", 1);
			SysAcl acl = aclMapper.selectOne(query1);
			// 如果之前不是菜单权限, 并且已经存在菜单权限, 是不合法的业务
			if (Objects.nonNull(acl) && before.getType() != 1) {
				return ApiResp.warning("权限模块只能有一个菜单类型的权限");
			}
		}

		// 当前时间
		Date currentTime = DateUtil.localDateTimeNow();
		SysAcl build = SysAcl.builder()
			.name(req.getName())
			.aclModuleId(req.getAclModuleId())
			.url(req.getUrl())
			.type(req.getType())
			.status(req.getStatus())
			.seq(req.getSeq())
			.menuName(StringUtils.isBlank(req.getMenuName()) ? "-" : req.getMenuName())
			.menuUrl(StringUtils.isBlank(req.getMenuUrl()) ? "-" : req.getMenuUrl())
			.btnSign(StringUtils.isBlank(req.getBtnSign()) ? "-" : req.getBtnSign())
			.remark(req.getRemark())
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.updateTime(currentTime)
			.build();

		UpdateWrapper<SysAcl> updateWrapper = new UpdateWrapper<>();
		updateWrapper.eq("surrogate_id", req.getSurrogateId());
		int update = aclMapper.update(build, updateWrapper);
		if (update < 1) {
			return ApiResp.warning(EDITE_ERROR);
		}
		// 更新缓存
		cacheService.invalidAllUserAclCache();
		return ApiResp.success(SUCCESS);
	}

	/**
	 * 分页查询权限点列表
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public PageResult<SysAclResp> pageList(AclPageReq req) {
		List<SysAclResp> list = aclMapper.pageAclList(req);
		Integer count = aclMapper.countPageAclList(req);
		if (CollectionUtils.isEmpty(list)) {
			return new PageResult<>(new ArrayList<>(0), 0);
		}
		return new PageResult<>(list, count);
	}

	/**
	 * 获取权限点分配的用户角色
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<ConcurrentHashMap<String, Object>> acls(AclReq req) {
		ConcurrentHashMap<String, Object> map = new ConcurrentHashMap<>();

		// 查询权限对应的角色id
		QueryWrapper<SysRoleAcl> query1 = new QueryWrapper<>();
		query1.select("role_id")
			.eq("acl_id", req.getSurrogateId());
		List<SysRoleAcl> roleIdList = roleAclMapper.selectList(query1);
		Set<Long> roleIdSet = roleIdList.stream().map(SysRoleAcl::getAclId).collect(Collectors.toSet());
		if (CollectionUtils.isEmpty(roleIdSet)) {
			map.put("users", Lists.newArrayList());
		}

		// 根据角色id查询用户id
		QueryWrapper<SysRoleUser> query2 = new QueryWrapper<>();
		query2.select("user_id")
			.in("role_id", Lists.newArrayList(roleIdSet));
		List<SysRoleUser>userIdList = roleUserMapper.selectList(query2);
		Set<Long> userIdSet = userIdList.stream().map(SysRoleUser::getUserId).collect(Collectors.toSet());
		if (CollectionUtils.isEmpty(userIdSet)) {
			map.put("roles", Lists.newArrayList());
		}

		// 根据角色id查询具体的角色信息
		QueryWrapper<SysRole> query4 = new QueryWrapper<>();
		query4.in("surrogate_id", Lists.newArrayList(roleIdSet));
		List<SysRole> roleList = roleMapper.selectList(query4);

		// 根据用户id查询用户详细信息
		QueryWrapper<SysUser> query3 = new QueryWrapper<>();
		query3.in("surrogate_id", Lists.newArrayList(userIdSet));
		List<SysUser> userList = userMapper.selectList(query3);

		map.put("users", userList);
		map.put("roles",roleList);
		return ApiResp.success(map);
	}

	@Override
	public ApiResp<String> delete(Long surrogateId) {
		QueryWrapper<SysAcl> wrapper = new QueryWrapper<>();
		wrapper.eq("surrogate_id", surrogateId);
		int delete = aclMapper.delete(wrapper);
		if (delete < 1) {
			return ApiResp.failure(DEL_ERROR);
		}
		// 更新缓存
		cacheService.invalidAllUserAclCache();
		return ApiResp.success();
	}

	@Override
	public Long getAclCountByAclModuleId(Long aclModuleId) {
		QueryWrapper<SysAcl> wrapper = new QueryWrapper<>();
		wrapper.eq("acl_module_id", aclModuleId);
		Long count = aclMapper.selectCount(wrapper);
		return count;
	}
}
