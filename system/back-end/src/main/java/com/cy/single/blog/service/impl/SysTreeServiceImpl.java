package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cy.single.blog.dao.SysAclMapper;
import com.cy.single.blog.dao.SysAclModuleMapper;
import com.cy.single.blog.dao.SysOrgMapper;
import com.cy.single.blog.pojo.dto.sys.acl.AclDto;
import com.cy.single.blog.pojo.dto.sys.aclmodule.AclModuleDto;
import com.cy.single.blog.pojo.dto.sys.org.OrgLevelDto;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.service.MessageLangService;
import com.cy.single.blog.service.SysCoreService;
import com.cy.single.blog.service.SysTreeService;
import com.cy.single.blog.utils.acl.AclUtil;
import com.cy.single.blog.utils.aclmodule.AclModuleUtil;
import com.cy.single.blog.utils.orgUtil.LevelUtil;
import com.cy.single.blog.utils.orgUtil.OrgUtil;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
@Service
@Slf4j
public class SysTreeServiceImpl implements SysTreeService {

	@Autowired
	private SysOrgMapper orgMapper;

	@Autowired
	private SysAclModuleMapper aclModuleMapper;

	@Autowired
	private SysAclMapper aclMapper;

	@Autowired
	private SysCoreService coreService;

	@Autowired
	private MessageLangService msgService;

	/**
	 * 获取组织树
	 * @return
	 */
	@Override
	public List<OrgLevelDto> orgTree() {
		// 查询所有组织信息
		List<SysOrg> orgList = orgMapper.selectList(new QueryWrapper());

		// 实体集合转为Dto集合
		List<OrgLevelDto> dtoList = orgList.stream().map(OrgLevelDto::adapt).collect(Collectors.toList());
		return orgListToTree(dtoList);
	}

	/**
	 * 递归组装tree
	 * @param dtoList 数据库中的所有组织信息
	 * @return
	 */
	@Override
	public List<OrgLevelDto> orgListToTree(List<OrgLevelDto> dtoList) {
		if (CollectionUtils.isEmpty(dtoList)) {
			return new ArrayList<>();
		}

		// 获取一级组织 rootList
		List<OrgLevelDto> rootList = dtoList.stream()
			.filter(orgLevelDto -> LevelUtil.ROOT.equals(orgLevelDto.getLevel()))// 过滤出顶层组织信息
			.sorted(Comparator.comparing(OrgLevelDto::getSeq)) // 按照seq字段升序排序
			.collect(Collectors.toList());

		// 按照level分组
		Map<String, List<OrgLevelDto>> levelOrgMap = dtoList.stream()
			.sorted(Comparator.comparing(SysOrg::getSeq)) // 按照seq字段升序排序
			.collect(Collectors.groupingBy(SysOrg::getLevel));

		// 从顶层开始递归生成组织树
		transformOrgTree(rootList, LevelUtil.ROOT, levelOrgMap);
		return rootList;
	}

	/**
	 * 将组织树转为树结构
	 * @param levelDtoList
	 * @param level
	 * @param levelOrgMap
	 */
	private void transformOrgTree(List<OrgLevelDto> levelDtoList, String level, Map<String, List<OrgLevelDto>> levelOrgMap) {

		levelDtoList.forEach(orgLevelDto -> {
			/**
			 * 处理当前层级数据
			 * **/
			// 计算出下一级的level
			String nextLevel = LevelUtil.calculateLevel(level, orgLevelDto.getId());// 0.1

			// 获得下一级的所有组织信息
			List<OrgLevelDto> dtoNextTempList = levelOrgMap.get(nextLevel);//

			if (CollectionUtils.isEmpty(dtoNextTempList)) {// 没有下一级了
				return;
			}

			// 排序
			Collections.sort(dtoNextTempList, OrgUtil.orgLevelDtoComparator);
			// 设置下一层组织
			orgLevelDto.setOrgList(dtoNextTempList);

			// 进入下一层进行递归处理
			transformOrgTree(dtoNextTempList,nextLevel,levelOrgMap);
		});
	}

	/**
	 * 获取权限模块树
	 * @return
	 */
	@Override
	public List<AclModuleDto> aclModuleTree() {
		// 查询所有权限模块信息
		List<SysAclModule> aclModuleList = aclModuleMapper.selectList(new QueryWrapper());

		// 实体集合转为Dto集合
		List<AclModuleDto> dtoList = aclModuleList.stream().map(aclModule -> AclModuleDto.adapt(aclModule)).collect(Collectors.toList());

		return aclModuleListToTree(dtoList);
	}

	private List<AclModuleDto> aclModuleListToTree(List<AclModuleDto> dtoList) {
		if (CollectionUtils.isEmpty(dtoList)) {
			return new ArrayList<>();
		}

		// 获取一级组织 rootList
		List<AclModuleDto> rootList = dtoList.stream()
			.filter(dto -> LevelUtil.ROOT.equals(dto.getLevel()))// 过滤出顶层组织信息
			.sorted(Comparator.comparing(AclModuleDto::getSeq)) // 按照seq字段升序排序
			.collect(Collectors.toList());

		// 按照level分组
		Map<String, List<AclModuleDto>> levelAclModuleMap = dtoList.stream()
			.sorted(Comparator.comparing(AclModuleDto::getSeq)) // 按照seq字段升序排序
			.collect(Collectors.groupingBy(SysAclModule::getLevel));

		// 从顶层开始递归生成权限模块树
		transformAclModuleTree(rootList,LevelUtil.ROOT,levelAclModuleMap);
		return rootList;
	}

	private void transformAclModuleTree(List<AclModuleDto> levelAclModuleList, String level, Map<String, List<AclModuleDto>> levelAclModuleMap) {

		levelAclModuleList.forEach(aclModuleDto -> {
			/**
			 * 处理当前层级数据
			 * **/
			// 计算出下一级的level
			String nextLevel = LevelUtil.calculateLevel(level, aclModuleDto.getId());// 0.1

			// 获得下一级的所有组织信息
			List<AclModuleDto> dtoNextTempList = levelAclModuleMap.get(nextLevel);//

			if (CollectionUtils.isEmpty(dtoNextTempList)) {// 没有下一级了
				return;
			}

			// 排序
			Collections.sort(dtoNextTempList, AclModuleUtil.aclModuleLevelDtoComparator);

			// 设置下一层组织
			aclModuleDto.setAclModuleDtoList(dtoNextTempList);

			// 进入下一层进行递归处理
			transformAclModuleTree(dtoNextTempList,nextLevel, levelAclModuleMap);
		});
	}

	/** ============================== 获取权限模块与权限点组成的树 ============================== **/

	/**
	 * 获取角色对应的权限树
	 * @param roleSurrogateId 角色id
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<AclModuleDto> roleAclTree(Long roleSurrogateId) {
		// 1. 拿到当前用户所属角色中已分配的的权限点(此处为用户所能支配的权限上限)
		List<SysAcl> userAclList = coreService.getCurrentUserAclList();

		// 2. 获取用户所属角色的已分配的权限id(AclId), [去重, 比较时性能优于list]
		Set<Long> userAclIdSet = userAclList.stream().map(acl -> acl.getSurrogateId()).collect(Collectors.toSet());

		// 3. 获取当前角色分配过的权限点(此处为当前)
		List<SysAcl> roleAclList = coreService.getRoleAclList(roleSurrogateId);

		// 4. 当前角色已分配的权限id集合, [此处转为set是为了比较时的性能考虑, 比较时性能优于list]
		Set<Long> roleAclIdSet = roleAclList.stream().map(roleAcl -> roleAcl.getSurrogateId()).collect(Collectors.toSet());

		// 5. 获取所有的权限点列表, list
		QueryWrapper<SysAcl> query2 = new QueryWrapper<>();
		query2.eq("status",0);// 获取正常的权限点
		List<SysAcl> aclAllList = aclMapper.selectList(query2);

		// 将权限点列表为当前用户标记出访问权限
		List<AclDto> aclDtoList = Lists.newArrayList();
		aclAllList.stream()
			.map(acl -> AclDto.adapt(acl))
			.forEach(aclDto -> {
				// 用户已分配的权限点, 可操作
				if (userAclIdSet.contains(aclDto.getSurrogateId())) {
					aclDto.setHasAcl(true);
				}

				// 是否在前端显示为"选中", 选中状态取决于角色所分配的权限点, 分配过的权限点就为选中状态
				if (roleAclIdSet.contains(aclDto.getSurrogateId())) {
					aclDto.setChecked(true);
				}
				aclDtoList.add(aclDto);
			});

		// 将权限点与权限模块组装为树结构
		return aclListToTree(aclDtoList);
	}

	/**
	 * 获取权限模块以及模块下面的权限点明细
	 * @param aclDtoList
	 * @return
	 */
	private List<AclModuleDto> aclListToTree (List<AclDto> aclDtoList) {
		if (CollectionUtils.isEmpty(aclDtoList)) {
			return Lists.newArrayList();
		}
		// 拿到权限模块系统权限树
		List<AclModuleDto> aclModuleDtoList = this.aclModuleTree();

		// 根据[权限模块id]分组
		Map<Long, List<AclDto>> moduleIdAclMap = aclDtoList.stream()
			.filter(aclDto -> aclDto.getStatus() == 0) // 获取正常的权限点
			.collect(Collectors.groupingBy(aclDto -> aclDto.getAclModuleId()));

		// 绑定权限点到权限模块下
		this.bindAclsWithOrder(aclModuleDtoList, moduleIdAclMap);
		return aclModuleDtoList;
	}

	/**
	 * 递归绑定权限点到权限模块下
	 * @param aclModuleDtoList
	 * @param moduleIdAclMap
	 */
	private void bindAclsWithOrder(List<AclModuleDto> aclModuleDtoList,Map<Long, List<AclDto>> moduleIdAclMap) {
		if (CollectionUtils.isEmpty(aclModuleDtoList)) {
			return;
		}

		aclModuleDtoList.forEach(aclModuleDto -> {
			List<AclDto> aclDtoList = moduleIdAclMap.get(aclModuleDto.getSurrogateId());
			// 如果权限点列表不为空就绑定到权限模块上面
			if (CollectionUtils.isNotEmpty(aclDtoList)) {
				// 根据seq排序
				Collections.sort(aclDtoList, AclUtil.aclDtoComparator);
				// 将排序好的权限点列表放到对应的权限模块下
				aclModuleDto.setAclDtoList(aclDtoList);
			}
			// 递归下一级的权限点和权限模块
			bindAclsWithOrder(aclModuleDto.getAclModuleDtoList(),moduleIdAclMap);
		});
	}

	/** ============ 用户权限树  ============ **/
	@Override
	public List<AclModuleDto> userAclTree(Long userId) {
		List<SysAcl> userAclList = coreService.getUserAclList(userId);
		List<AclDto> aclDtoList = userAclList.stream()
			.map(acl -> {
				AclDto dto = AclDto.adapt(acl);
				dto.setHasAcl(true);
				dto.setChecked(true);
				return dto;
			})
			.collect(Collectors.toList());
		return aclListToTree(aclDtoList);
	}

}
