package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysAclMapper;
import com.cy.single.blog.dao.SysRoleAclMapper;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysRoleAcl;
import com.cy.single.blog.pojo.req.acl.AclReq;
import com.cy.single.blog.pojo.req.roleacl.RoleAclSaveReq;
import com.cy.single.blog.service.MessageLangService;
import com.cy.single.blog.service.SysAclCoreService;
import com.cy.single.blog.service.SysRoleAclService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.collect.Lists;
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
	private SysAclCoreService coreService;

	@Autowired
	private SysRoleAclMapper roleAclMapper;

	@Autowired
	private SysAclMapper aclMapper;

	@Autowired
	private MessageLangService msgService;

	/**
	 * 更新[角色-权限点]信息
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> updateRoleAcls(RoleAclSaveReq req) {
		/**
		 * 将权多个权限点的id转换为Long的列表
		 */
		List<Long> aclIdList = req.getAclIdList();

		/**
		 * 过滤权限模块id, 只保留权限点id
		 */
		AclReq aclReq = new AclReq();
		aclReq.setStatus(0); // 查询所有有效的权限点id
		Set<Long> aclIdAllSet = Sets.newTreeSet(aclMapper.selectAclIdAllList(aclReq));
		Set<Long> aclIdsSetTemp = Sets.newTreeSet(aclIdList); // 当前需要更新的权限id
		Set<Long> aclIdsSet = Sets.newTreeSet(aclIdsSetTemp);
		aclIdsSetTemp.removeAll(aclIdAllSet);
		aclIdsSet.removeAll(aclIdsSetTemp);

		/**
		 * 记录需要更新的有效权限信息
		 */
		List<Long> updateIdList = Lists.newArrayList(aclIdsSet);

		/**
		 * 判断将要修改的权限点是否超过了当前用户所拥有的最大权限范围
		 */
		List<SysAcl> currentUserAclList = coreService.getCurrentUserAclList();
		Set<Long> currentUserAclIdSet = currentUserAclList.stream().map(SysAcl::getSurrogateId).collect(Collectors.toSet());
		aclIdsSet.removeAll(currentUserAclIdSet);
		if (CollectionUtils.isNotEmpty(aclIdsSet)) {
			return ApiResp.failure("待更新的权限点超过已有权限");
		}

		/**
		 * 查询当前角色已经分配的权限点id
		 */
		Set<Long> originAclIdSet = Sets.newTreeSet(roleAclMapper.selectAclIdListByRoleId(req.getRoleId()));
		Set<Long> aclIdSet = Sets.newTreeSet(aclIdList);
		if (CollectionUtils.isEqualCollection(originAclIdSet, aclIdSet)) {
			return ApiResp.warning("没有需要更新的权限点");
		}
		originAclIdSet.removeAll(aclIdSet);
		/**
		 * 判断角色将要修改的权限点与之前已经分配的权限点数量是否相同, 如果相同则不需要更新
		 */
		if (originAclIdSet.size() == aclIdSet.size()) {
			if (CollectionUtils.isEmpty(originAclIdSet)) {
				return ApiResp.warning("没有需要更新的权限点");
			}
		}

		/**
		 * 修改需要更新的权限点
		 */
		this.updateRoleAcls(req.getRoleId(), updateIdList);

		// todo 让角色对应的用户权限点缓存失效
		return ApiResp.success("修改角色对应权限点成功");
	}

	/**
	 * 更新权限点
	 * @param roleId
	 * @param aclIdList
	 */
	@Transactional
	public void updateRoleAcls(Long roleId, List<Long> aclIdList) {
		if (CollectionUtils.isEmpty(aclIdList)) {
			return;
		}
		// delete role info
		QueryWrapper<SysRoleAcl> wrapper = new QueryWrapper<>();
		wrapper.eq("role_id",roleId);
		roleAclMapper.delete(wrapper);

		// 构建新的角色-权限点对象, 然后批量插入
		Date currentTime = DateUtil.localDateTimeNow();
		List<SysRoleAcl> roleAclList = aclIdList.stream()
			.map(aclId -> SysRoleAcl.builder()
					.surrogateId(IdWorker.getSnowFlakeId())
					.roleId(roleId)
					.aclId(aclId)
					.operator(RequestHolder.getCurrentUser().getSurrogateId())
					.operateIp("127.0.0.1")
					.createTime(currentTime)
					.updateTime(currentTime)
				.build())
			.collect(Collectors.toList());
		// batch save role info
		this.saveBatch(roleAclList);
	}
}
