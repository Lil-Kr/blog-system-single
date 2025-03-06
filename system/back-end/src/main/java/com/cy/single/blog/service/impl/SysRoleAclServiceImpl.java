package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysRoleAclMapper;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysRoleAcl;
import com.cy.single.blog.pojo.req.roleacl.RoleAclSaveReq;
import com.cy.single.blog.service.SysCoreService;
import com.cy.single.blog.service.SysRoleAclService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.base.Splitter;
import com.google.common.collect.Sets;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
@Service
@Slf4j
public class SysRoleAclServiceImpl extends ServiceImpl<SysRoleAclMapper, SysRoleAcl> implements SysRoleAclService {

	@Autowired
	private SysCoreService coreService;

	@Autowired
	private SysRoleAclMapper roleAclMapper;

	/**
	 * 更新角色对应的权限点信息
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> changeRoleAcls(RoleAclSaveReq param) {
		// 将权多个权限点的id转换为Long的列表
		List<Long> aclIdList = Splitter.on(",").trimResults().omitEmptyStrings().splitToList(param.getAclIds())
			.stream()
			.map(aclId -> Long.valueOf(aclId))
			.collect(Collectors.toList());

		// 判断将要修改的权限点是否超过了当前用户所拥有的最大权限范围
		List<SysAcl> currentUserAclList = coreService.getCurrentUserAclList();
		Set<Long> currentAclIdSet = currentUserAclList.stream().map(acl -> acl.getSurrogateId()).collect(Collectors.toSet());
		Set<Long> aclIdsSet = Sets.newHashSet(aclIdList);
		aclIdsSet.removeAll(currentAclIdSet);
		if (CollectionUtils.isNotEmpty(aclIdsSet)) {
			return ApiResp.failure("待更新的权限点超过已有权限");
		}

		// 查询角色已经分配的权限点id
		List<Long> originAclIdList = roleAclMapper.selectAclIdListByRoleId(param.getRoleId());
		if (aclIdList.size() == originAclIdList.size()) {
			Set<Long> originAclIdSet = Sets.newHashSet(originAclIdList);
			Set<Long> aclIdSet = Sets.newHashSet(aclIdList);
			originAclIdSet.removeAll(aclIdSet);
			if (CollectionUtils.isEmpty(originAclIdSet)) {// 待更新的权限点与原来的一致, 不用更新
				return ApiResp.failure("没有需要更新的权限点");
			}
		}

		// 修改需要更新的权限点
		this.updateRoleAcls(param.getRoleId(), aclIdList);
		return ApiResp.success("修改角色对应权限点成功");
	}

	/**
	 * 更新权限点
	 * @param roleId
	 * @param aclIdList
	 */
	@Transactional
	public void updateRoleAcls(Long roleId,List<Long> aclIdList) {
		if (CollectionUtils.isEmpty(aclIdList)) {
			return;
		}
		// delete role info
		QueryWrapper<SysRoleAcl> wrapper = new QueryWrapper<>();
		wrapper.eq("role_id",roleId);
		roleAclMapper.delete(wrapper);

		Date currentTime = DateUtil.localDateTimeNow();
		List<SysRoleAcl> roleAclList = aclIdList.stream()
			.map(aclId -> {
				return SysRoleAcl.builder()
					.surrogateId(IdWorker.getSnowFlakeId())
					.roleId(roleId)
					.aclId(aclId)
					.operator(RequestHolder.getCurrentUser().getSurrogateId())
					.operateIp("127.0.0.1")
					.createTime(currentTime)
					.updateTime(currentTime)
					.build();
			})
			.collect(Collectors.toList());
		// batch save role info
		this.saveBatch(roleAclList);
	}
}
