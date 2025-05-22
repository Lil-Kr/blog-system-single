package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.*;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysAclData;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.resp.sys.role.SysRoleResp;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.service.SysAclCoreService;
import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SysAclCoreServiceImpl implements SysAclCoreService {

	@Autowired
	private SysAclMapper aclMapper;

	@Autowired
	private SysRoleMapper roleMapper;

	@Autowired
	private SysRoleUserMapper roleUserMapper;

	@Autowired
	private SysRoleAclMapper roleAclMapper;

	@Autowired
	private SysAclDataMapper aclDataMapper;

	@Autowired
	private CacheService cacheService;

	/**
	 * 获取当前用户所拥有的权限列表
	 * @return List<SysAcl>
	 * @throws Exception
	 */
	@Override
	public List<SysAcl> getCurrentUserAclList() {
		// retrieve current user id
		Long userId = RequestHolder.getCurrentUser().getSurrogateId();

		/**
		 * retrieve from cache for [user - acl]
		 * if cache not exist, then get from DB
		 */
		List<SysAcl> userAclList = Optional.ofNullable(cacheService.getUserAclListCache(userId))
			.filter(CollectionUtils::isNotEmpty)
			.orElseGet(() -> {
				List<SysAcl> aclList = this.getUserAclList(userId);
				cacheService.saveUserAclCache(userId, aclList);
				return aclList;
			});

		return userAclList;
	}

	/**
	 * retrieve [user-role-acl] list
	 * @param userId userId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<SysAcl> getUserAclList(Long userId) {
		// if current is supper admin, then return all acl list
		if (isSuperAdmin(userId)) {
			QueryWrapper<SysAcl> wrapper = new QueryWrapper<>();
			wrapper.eq("status", 0);// 查询启用的权限点
			return aclMapper.selectList(wrapper);
		}

		/**
		 * 1. 如果不是超级管理员, 就取出当前用户已经分配的角色id列表, 一个用户可以被分配到多个角色, 最后权限取多个角色的并集
		 * 1 step. if not supper admin, then retrieve current adminUser already own roleId list
		 * remark: an adminUser can be assigned multiple roles
		 */
		List<Long> userRoleIdList = roleUserMapper.selectRoleIdListByUserId(userId);
		if (CollectionUtils.isEmpty(userRoleIdList)) {
			return Lists.newArrayList();
		}

		/**
		 * 2. 根据角色id获取对应用户已经分配的权限点列表id(acl_id)
		 * step2. according to roleId, retrieve corresponding adminUser already assigned aclId list. it`s List<aclId>
		 */
		List<Long> userAclIdList = roleAclMapper.selectAclIdListByRoleIdList(userRoleIdList);
		if (CollectionUtils.isEmpty(userAclIdList)) {
			return Lists.newArrayList();
		}

		/**
		 * 3. 根据权限点列表id查询详细权限点列表信息
		 * step2. according aclId list, then retrieve acl detail info list
		 */
		return aclMapper.selectAclListByAclIdList(userAclIdList);
	}

	/**
	 * 获取当前用户对应的[xxx类型]权限点
	 * 用于菜单构建
	 * @param userId
	 * @param type
	 * @return
	 */
	@Override
	public List<SysAcl> getUserAclList(Long userId, Integer type) {
		// 如果当前用户是超级管理员, 返回所有的菜单权限点列表
		if (isSuperAdmin(userId)) {
			QueryWrapper<SysAcl> wrapper = new QueryWrapper<>();
			wrapper.eq("type", type);
			wrapper.eq("status", 0);
			return aclMapper.selectList(wrapper);
		}

		// 1. 如果不是超级管理员, 就取出当前用户已经分配的角色id列表, 一个用户可以被分配到多个角色, 最后权限取多个角色的并集
		List<Long> userRoleIdList = roleUserMapper.selectRoleIdListByUserId(userId);
		if (CollectionUtils.isEmpty(userRoleIdList)) {
			return Lists.newArrayList();
		}

		// 2. 根据角色id获取对应用户已经分配的权限点列表id(acl_id)
		List<Long> userAclIdList = roleAclMapper.selectAclIdListByRoleIdList(userRoleIdList);
		if (CollectionUtils.isEmpty(userAclIdList)) {
			return Lists.newArrayList();
		}

		// 3. 根据权限点列表id查询详细权限点列表信息
		return aclMapper.selectAclListByAclIdList(userAclIdList);
	}

	/**
	 * 获取当前角色已分配的[角色-权限]关系列表
	 * 当前角色已分配的权限点列表
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<SysAcl> getRoleAclList(Long roleId) {
		// 获取当前角色已分配的权限点id列表
		List<Long> aclIdList = roleAclMapper.selectAclIdListByRoleId(roleId);
		if (CollectionUtils.isEmpty(aclIdList)) {
			return Lists.newArrayList();
		}

		// 再根据权限点id列表拿到具体的权限点列表信息
		List<SysAcl> aclByIdList = aclMapper.selectAclListByAclIdList(aclIdList);
		if (CollectionUtils.isEmpty(aclByIdList)) {
			return Lists.newArrayList();
		}
		return aclByIdList;
	}

	/**
	 * 是否是超级管理员
	 * 如果用户需要分配权限给下级用户, 前提是自己有所需要分配的权限
	 * @return
	 * @throws Exception
	 */
	private Boolean isSuperAdmin(Long userSurrogateId) {
		// 查询当前用户分配的角色中是否包含是超级管理员
		List<Long> roleIdList = roleUserMapper.selectRoleIdListByUserId(userSurrogateId);
		if (CollectionUtils.isEmpty(roleIdList)) {
			return false;
		}

		// 查询角色明细, 包含角色类型
		List<SysRoleResp> roleList = roleMapper.selectRoleLIstByIds(roleIdList);
		// 查看是否有超级管理员的角色
		return roleList.stream().anyMatch(role -> role.getType() == 1);
	}

	/**
	 * 后端服务 Api 鉴权
	 * @param url
	 * @return
	 */
	@Override
	public boolean hasUrlAcl(String url) {
		Long userId = RequestHolder.getCurrentUser().getSurrogateId();
		/**
		 * 1. 超级管理员可以访问所有url
		 */
		if (isSuperAdmin(userId)) {
			return true;
		}

		/**
		 * 2. 检查当前用户是否拥有 当前url的访问权限
		 */
		List<SysAcl> aclList = this.getCurrentUserAclList();
		List<Long> hasAclIdList = aclList.stream().filter(acl -> {
			if (acl.getUrl().equals(url) || url.startsWith(acl.getUrl())) {
				return true;
			}
			return false;
		})
		.map(SysAcl::getSurrogateId)
		.collect(Collectors.toList());

		if (CollectionUtils.isEmpty(hasAclIdList)) {
			return false;
		}

		/**
		 * 3. 数据校验
		 * 如果未配置数据权限, 默认有权限访问数据
		 * todo: 数据权限功能待开发
		 */
		List<SysAclData> aclDataList = Optional.ofNullable(aclDataMapper.selectAclDataListByAclIds(hasAclIdList))
			.orElse(Lists.newArrayList())
			.stream()
			.filter(aclData -> aclData.getStatus() == 0) // 获取启用状态的数据权限
			.collect(Collectors.toList());

		if (CollectionUtils.isEmpty(aclDataList)) {
			return true;
		}

		/**
		 * 逐条判断数据权限
		 * rule 没有任何字符串, 表示没有权限
		 */
		String rule = this.aclDataRule(aclDataList);
		if (StringUtils.isBlank(rule)) {
			return false;
		}

		return true;
	}

	/**
	 * 数据权限校验
	 * @param aclDataList
	 * @return
	 */
	private String aclDataRule(List<SysAclData> aclDataList) {
		String res = "";
		// 单条规则解析
		if (aclDataList.size() == 1) {
			// 只有一条规则
			res = checkAclDatRule(aclDataList.get(0));
		} else {
			// 有多条规则
			res = checkAclDatRule(aclDataList);
		}
		return res;
	}

	/**
	 * 单条数据权限规则
	 * 不处理 nextParamOp 字段
	 * @param aclData
	 * @return
	 */
	private String checkAclDatRule(SysAclData aclData) {
		StringBuilder res = new StringBuilder();

		if (!checkAclData(aclData)) {
			return "";
		}

		// 获取当前用户信息
		SysUser adminUser = RequestHolder.getCurrentUser();
		Long orgId = adminUser.getOrgId();

		/**
		 * 判断当前用户的组织是否有权限查看数据
		 */
		Set<Long> paramSet = Splitter.on(",")
			.trimResults()
			.omitEmptyStrings()
			.splitToStream(aclData.getParam())
			.map(Long::valueOf)
			.collect(Collectors.toSet());
		/**
		 * 拆解参数, 如果配置了多个 param
		 */
		if (CollectionUtils.isEmpty(paramSet) || !paramSet.contains(orgId)) {
			return "";
		}

		// 获取操作符, < > <= >= or ....
		String operaSign = switchOperation(aclData.getOperation());

		/**
		 * 拼接 sql
		 */
		paramSet.forEach(param -> {
			res.append(param + " ");
			// 特殊处理 [介于...之间]
			if (aclData.getOperation() == 6) {
				res.append("between " + aclData.getValue1() + " and " + aclData.getValue2() + " and ");
			} else if (aclData.getOperation() == 5) {
				// 特殊处理 [包含]
				res.append(operaSign + " (");
				res.append(Joiner.on(",").join(Splitter.on(",").trimResults().split(aclData.getValue1())));
				res.append(") ");
				res.append("and ");
			} else {
				res.append(operaSign + " " + aclData.getValue1() + " and ");
			}
		});

		String result = Joiner.on(" and ")
			.join(Splitter.on(" and ")
				.trimResults() // 去除每个分隔项的前后空格
				.omitEmptyStrings() // 忽略空字符串
				.split(res))
				.trim(); // 去掉最后的空格

		return result;
	}



	/**
	 * 多条数据规则
	 * 必须处理 nextParamOp 字段
	 * todo: 未完成
	 * @param aclDataList
	 * @return
	 */
	private String checkAclDatRule(List<SysAclData> aclDataList) {
		/**
		 * 判断 nextParamOp 字段是否合法
		 */
		List<Integer> nextParamOps = aclDataList.stream().map(SysAclData::getNextParamOp).collect(Collectors.toList());
		if (nextParamOps.size() != aclDataList.size() - 1) {
			return "";
		}
		StringBuilder res = new StringBuilder();
		// 获取当前用户信息
		SysUser adminUser = RequestHolder.getCurrentUser();
		Long orgId = adminUser.getOrgId();


		return "";
	}

	/**
	 * 规则的符号转换
	 * @param operation
	 * @return
	 */
	public String switchOperation(Integer operation) {
		StringBuilder sign = new StringBuilder();
		switch (operation) {
			case 0: // 等于
				sign.append("=");
				break;
			case 1: // 大于
				sign.append(">");
				break;
			case 2: // 小于
				sign.append("<");
				break;
			case 3: // 大于等于
				sign.append(">=");
				break;
			case 4: // 小于等于
				sign.append("<=");
				break;
			case 5: // 包含
				sign.append("in");
				break;
			case 6: // 介于...之间
				sign.append("between");
				break;
			case 7: // 或者
				sign.append("or");
				break;
			default:
				sign.append("");
				break;
		}

		return sign.toString();
	}

	/**
	 * 检查当前用户是否在数据权限配置内
	 * @param aclData
	 * @return
	 */
	private boolean checkAclData(SysAclData aclData) {

		return false;
	}
}
