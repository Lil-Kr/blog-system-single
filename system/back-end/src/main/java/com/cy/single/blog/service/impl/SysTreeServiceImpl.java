package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cy.single.blog.dao.SysAclMapper;
import com.cy.single.blog.dao.SysAclModuleMapper;
import com.cy.single.blog.dao.SysOrgMapper;
import com.cy.single.blog.pojo.dto.sys.acl.AclDTO;
import com.cy.single.blog.pojo.dto.sys.aclmodule.AclModuleDTO;
import com.cy.single.blog.pojo.dto.sys.org.OrgLevelDTO;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.service.SysAclCoreService;
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
	private SysAclCoreService coreService;

	/**
	 * 获取组织树
	 * @return
	 */
	@Override
	public List<OrgLevelDTO> orgTree() {
		// 查询所有组织信息
		List<SysOrg> orgList = orgMapper.selectList(new QueryWrapper());

		// 实体集合转为Dto集合
		List<OrgLevelDTO> dtoList = orgList.stream().map(OrgLevelDTO::adapt).collect(Collectors.toList());
		return orgListToTree(dtoList);
	}

	/**
	 * 递归组装tree
	 * @param dtoList 数据库中的所有组织信息
	 * @return
	 */
	private List<OrgLevelDTO> orgListToTree(List<OrgLevelDTO> dtoList) {
		if (CollectionUtils.isEmpty(dtoList)) {
			return new ArrayList<>();
		}

		// 获取一级组织 rootList
		List<OrgLevelDTO> rootList = dtoList.stream()
			.filter(orgLevelDto -> LevelUtil.ROOT.equals(orgLevelDto.getLevel()))// 过滤出顶层组织信息
			.sorted(Comparator.comparing(OrgLevelDTO::getSeq)) // 按照seq字段升序排序
			.collect(Collectors.toList());

		// 按照level分组
		Map<String, List<OrgLevelDTO>> levelOrgMap = dtoList.stream()
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
	private void transformOrgTree(List<OrgLevelDTO> levelDtoList, String level, Map<String, List<OrgLevelDTO>> levelOrgMap) {
		levelDtoList.forEach(orgLevelDto -> {
			/**
			 * 处理当前层级数据
			 * **/
			// 计算出下一级的level
			String nextLevel = LevelUtil.calculateLevel(level, orgLevelDto.getId());// 0.1

			// 获得下一级的所有组织信息
			List<OrgLevelDTO> dtoNextTempList = levelOrgMap.get(nextLevel);//

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
	 * 获取所有的权限模块树
	 * @return
	 */
	@Override
	public List<AclModuleDTO> aclModuleTree() {
		// 查询所有权限模块信息
		List<SysAclModule> aclModuleList = aclModuleMapper.selectList(new QueryWrapper<>());

		// 实体集合转为Dto集合
		List<AclModuleDTO> dtoList = aclModuleList.stream().map(AclModuleDTO::adapt).collect(Collectors.toList());

		return aclModuleListToTree(dtoList);
	}

	/**
	 * 组装权限模块树
	 * @param dtoList
	 * @return
	 */
	private List<AclModuleDTO> aclModuleListToTree(List<AclModuleDTO> dtoList) {
		if (CollectionUtils.isEmpty(dtoList)) {
			return new ArrayList<>();
		}

		// 获取一级组织 rootList
		List<AclModuleDTO> rootList = dtoList.stream()
			.filter(dto -> LevelUtil.ROOT.equals(dto.getLevel()))// 过滤出顶层组织信息
			.sorted(Comparator.comparing(AclModuleDTO::getSeq)) // 按照seq字段升序排序
			.collect(Collectors.toList());

		// 按照level分组
		Map<String, List<AclModuleDTO>> levelAclModuleMap = dtoList.stream()
			.sorted(Comparator.comparing(AclModuleDTO::getSeq)) // 按照seq字段升序排序
			.collect(Collectors.groupingBy(SysAclModule::getLevel));

		// 从顶层开始递归生成权限模块树
		this.transformAclModuleTree(rootList, LevelUtil.ROOT, levelAclModuleMap);
		return rootList;
	}

	/**
	 * 从顶层开始递归生成权限模块树
	 * @param levelAclModuleList
	 * @param level
	 * @param levelAclModuleMap
	 */
	private void transformAclModuleTree(List<AclModuleDTO> levelAclModuleList, String level, Map<String, List<AclModuleDTO>> levelAclModuleMap) {
		levelAclModuleList.forEach(aclModuleDto -> {
			/**
			 * 处理当前层级数据
			 * **/
			// 计算出下一级的level
			String nextLevel = LevelUtil.calculateLevel(level, aclModuleDto.getId());// 0.1

			// 获得下一级的所有组织信息
			List<AclModuleDTO> dtoNextTempList = levelAclModuleMap.get(nextLevel);//

			if (CollectionUtils.isEmpty(dtoNextTempList)) {// 没有下一级了
				return;
			}

			// 排序
			Collections.sort(dtoNextTempList, AclModuleUtil.aclModuleLevelDtoComparator);

			// 设置下一层组织
			aclModuleDto.setAclModuleDTOList(dtoNextTempList);

			// 进入下一层进行递归处理
			transformAclModuleTree(dtoNextTempList,nextLevel, levelAclModuleMap);
		});
	}

	/** ============================== 获取权限模块与权限点组成的树 ============================== **/

	/**
	 * 获取角色对应的权限树
	 * @param roleId 角色id
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<AclModuleDTO> roleAclTree(Long roleId) {
		// 1. 拿到当前用户所属角色中已分配的的权限点(此处为用户所能支配的权限上限)
		List<SysAcl> userAclList = coreService.getCurrentUserAclList();

		// 2. 获取用户所属角色的已分配的权限id(AclId), [去重, 比较时性能优于list]
		Set<Long> userAclIdSet = userAclList.stream().map(SysAcl::getSurrogateId).collect(Collectors.toSet());

		// 3. 获取当前角色分配过的权限点(此处为当前)
		List<SysAcl> roleAclList = coreService.getRoleAclList(roleId);

		// 4. 当前角色已分配的权限id集合, [此处转为set是为了比较时的性能考虑, 比较时性能优于list]
		Set<Long> roleAclIdSet = roleAclList.stream().map(SysAcl::getSurrogateId).collect(Collectors.toSet());

		// 5. 获取所有的权限点列表 list
		QueryWrapper<SysAcl> query2 = new QueryWrapper<>();
		query2.eq("status",0); // 获取正常的权限点
		List<SysAcl> aclList = aclMapper.selectList(query2);

		// 将权限点列表为当前用户标记出访问权限
		List<AclDTO> aclDTOList = Lists.newArrayList();
		aclList.stream()
			.map(AclDTO::adapt)
			.forEach(aclDto -> {
				// 当前用户已拥有的权限点, 可操作
				if (userAclIdSet.contains(aclDto.getSurrogateId())) {
					aclDto.setHasAcl(true);
				}

				// 是否在前端显示为"选中", 选中状态取决于角色所分配的权限点, 分配过的权限点就为选中状态
				if (roleAclIdSet.contains(aclDto.getSurrogateId())) {
					aclDto.setChecked(true);
				}
				aclDTOList.add(aclDto);
			});

		// 将权限点与权限模块组装为树结构
		return this.aclListToTree(aclDTOList);
	}

	/**
	 * 获取权限模块以及模块下面的权限点明细
	 * @param aclDTOList 用户对应的权限点
	 * @return
	 */
	@Override
	public List<AclModuleDTO> aclListToTree(List<AclDTO> aclDTOList) {
		if (CollectionUtils.isEmpty(aclDTOList)) {
			return Lists.newArrayList();
		}
		// 拿到权限模块系统权限树
		List<AclModuleDTO> aclModuleDTOList = this.aclModuleTree();

		// 根据[权限模块id]分组
		Map<Long, List<AclDTO>> moduleIdAclMap = aclDTOList.stream()
			.filter(aclDto -> aclDto.getStatus() == 0) // 获取正常的权限点
			.collect(Collectors.groupingBy(SysAcl::getAclModuleId));

		// 绑定权限点到权限模块下
		this.bindAclsWithOrder(aclModuleDTOList, moduleIdAclMap);
		return aclModuleDTOList;
	}

	/**
	 * 递归绑定权限点到权限模块下
	 * @param aclModuleDTOList
	 * @param moduleIdAclMap 所有的权限模块信息
	 */
	private void bindAclsWithOrder(List<AclModuleDTO> aclModuleDTOList, Map<Long, List<AclDTO>> moduleIdAclMap) {
		if (CollectionUtils.isEmpty(aclModuleDTOList)) {
			return;
		}
		aclModuleDTOList.forEach(aclModuleDto -> {
			List<AclDTO> aclDTOList = moduleIdAclMap.getOrDefault(aclModuleDto.getSurrogateId(), Collections.emptyList());
			// 如果权限点列表不为空就绑定到权限模块上面
			if (CollectionUtils.isNotEmpty(aclDTOList)) {
				// 根据seq排序
				Collections.sort(aclDTOList, AclUtil.aclDtoComparator);
				// 将排序好的权限点列表放到对应的权限模块下
				aclModuleDto.setAclDTOList(aclDTOList);
			}

			// 递归下一级的权限点和权限模块
			bindAclsWithOrder(aclModuleDto.getAclModuleDTOList(), moduleIdAclMap);
		});
	}

	/**
	 * 用户权限树
	 * @param userId
	 * @return
	 */
	@Override
	public List<AclModuleDTO> userAclTree(Long userId) {
		List<SysAcl> userAclList = coreService.getUserAclList(userId);
		List<AclDTO> aclDTOList = userAclList.stream()
			.map(acl -> {
				AclDTO dto = AclDTO.adapt(acl);
				dto.setHasAcl(true);
				dto.setChecked(true);
				return dto;
			})
			.collect(Collectors.toList());
		return aclListToTree(aclDTOList);
	}

}
