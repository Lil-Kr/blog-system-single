package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.*;
import com.cy.single.blog.pojo.entity.sys.*;
import com.cy.single.blog.pojo.req.acl.AclPageReq;
import com.cy.single.blog.pojo.req.acl.AclReq;
import com.cy.single.blog.pojo.vo.sys.acl.SysAclVo;
import com.cy.single.blog.service.SysAclService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

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

	/**
	 * 添加权限点
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> addAcl(AclReq req) {
		if (checkAclExist(req.getAclModuleId(),req.getName(),req.getSurrogateId())) {
			return ApiResp.failure("待添加的权限点名不能重复");
		}
		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeNow();// 当前时间
		SysAcl acl = SysAcl.builder()
			.surrogateId(surrogateId)
			.number("ACL" + surrogateId)
			.name(req.getName())
			.aclModuleId(req.getAclModuleId())
			.url(req.getUrl())
			.type(req.getType())
			.status(req.getStatus())
			.seq(req.getSeq())
			.remark(req.getRemark())
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.createTime(currentTime)
			.updateTime(currentTime)
			.build();

		aclMapper.insert(acl);
		return ApiResp.success("添加权限点成功");
	}

	/**
	 * 更新权限点
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> editAcl(AclReq req) {
		if (checkAclExist(req.getAclModuleId(),req.getName(),req.getSurrogateId())) {
			return ApiResp.failure("待添加的权限点名不能重复");
		}
		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeNow();// 当前时间
		SysAcl acl = SysAcl.builder()
			.surrogateId(surrogateId)
			.number("ACL" + surrogateId)
			.name(req.getName())
			.aclModuleId(req.getAclModuleId())
			.url(req.getUrl())
			.type(req.getType())
			.status(req.getStatus())
			.seq(req.getSeq())
			.remark(req.getRemark())
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.createTime(currentTime)
			.updateTime(currentTime)
			.build();

		aclMapper.insert(acl);
		return ApiResp.success("添加权限点成功");
	}


	/**
	 * 判断同一个权限模块下是否存在相同的名称的权限点
	 * @param aclModuleId
	 * @param name
	 * @param surrogateId
	 * @return
	 */
	protected boolean checkAclExist(Long aclModuleId,String name,Long surrogateId) {
		QueryWrapper<SysAcl> query = new QueryWrapper<>();
		if (Objects.nonNull(surrogateId)) {
			query.eq("surrogate_id", surrogateId);
		}
		query.eq("acl_module_id", aclModuleId);
		query.eq("name", name);
		Long count = aclMapper.selectCount(query);

		if (count >= 1) {
			return true;
		}else {
			return false;
		}
	}

	/**
	 * 分页查询权限点列表
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public PageResult<SysAclVo> pageList(AclPageReq req) {
//		Page<SysAclVo> page = new Page<>(req.getCurrent(), req.getSize());
//		page.setCurrent(req.getCurrent());
//		page.setSize(req.getSize());
//		IPage<SysAclVo> iPage = aclMapper.selectAclListPage(page, req);
//		aclMapper.pageList();
//		return ApiResp.success(iPage);
		return null;
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
		Set<Long> roleIdSet = roleIdList.stream().map(roleAcl -> roleAcl.getAclId()).collect(Collectors.toSet());
		if (CollectionUtils.isEmpty(roleIdSet)) {
			map.put("users", Lists.newArrayList());
		}

		// 根据角色id查询用户id
		QueryWrapper<SysRoleUser> query2 = new QueryWrapper<>();
		query2.select("user_id")
			.in("role_id", Lists.newArrayList(roleIdSet));
		List<SysRoleUser>userIdList = roleUserMapper.selectList(query2);
		Set<Long> userIdSet = userIdList.stream().map(roleUser -> roleUser.getUserId()).collect(Collectors.toSet());
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
}
