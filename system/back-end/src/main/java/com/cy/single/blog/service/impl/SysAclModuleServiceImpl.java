package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysAclModuleMapper;
import com.cy.single.blog.pojo.dto.sys.aclmodule.AclModuleDto;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleDelReq;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleListReq;
import com.cy.single.blog.pojo.req.aclmodule.AclModuleReq;
import com.cy.single.blog.pojo.vo.sys.aclmodule.SysAclModuleVO;
import com.cy.single.blog.service.SysAclModuleService;
import com.cy.single.blog.service.SysAclService;
import com.cy.single.blog.service.SysTreeService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.cy.single.blog.utils.orgUtil.LevelUtil;
import com.google.common.base.Preconditions;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.enums.ReturnCodeEnum.DATA_INFO_UNUSUAL;
import static com.cy.single.blog.enums.ReturnCodeEnum.INFO_NOT_EXIST;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: acl module
 */
@Service
@Slf4j
public class SysAclModuleServiceImpl extends ServiceImpl<SysAclModuleMapper, SysAclModule> implements SysAclModuleService {

	@Autowired
	private SysAclModuleMapper aclModuleMapper;

	@Autowired
	private SysAclService aclService;

	@Autowired
	private SysTreeService treeService;

	/**
	 * 添加权限模块信息
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<String> addAclModule(AclModuleReq req) {
		/**
		 * 检查权限模块名是否相同
		 */
		if (checkAclModuleExist(req.getParentSurrogateId(),req.getName(),req.getSurrogateId())) {
			return ApiResp.failure("待添加的权限模块名不能重复");
		}

		/**计算层级**/
		SysAclModule parentAclModule = getParentAclModule(req.getParentSurrogateId());
		if (Objects.isNull(parentAclModule)) {
			return ApiResp.failure(DATA_INFO_UNUSUAL);
		}
		String level = LevelUtil.calculateLevel(Objects.isNull(parentAclModule) ? null : parentAclModule.getLevel(), parentAclModule.getId());

		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeNow();// 当前时间
		SysAclModule aclModule = SysAclModule.builder()
			.surrogateId(surrogateId)
			.number("ACLM"+ surrogateId)
			.parentId(parentAclModule.getSurrogateId())
			.parentName(parentAclModule.getName())
			.name(req.getName())
			.level(level)
			.seq(req.getSeq())
			.remark(req.getRemark())
			.createTime(currentTime)
			.updateTime(currentTime)
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.creatorId(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.build();
		aclModuleMapper.insert(aclModule);
		return ApiResp.success("添加权限模块成功");
	}

	/**
	 * 检查部权限模块是否存在
	 * @param parentId
	 * @param aclModuleName
	 * @param surrogateId
	 * @return true/false
	 */
	protected boolean checkAclModuleExist(Long parentId, String aclModuleName, Long surrogateId){
		QueryWrapper<SysAclModule> query1 = new QueryWrapper<>();
		query1.eq("parent_id",parentId);
		if (Objects.nonNull(aclModuleName)) {
			query1.eq("name",aclModuleName);
		}
		if (Objects.nonNull(surrogateId)) {
			query1.eq("surrogate_id",surrogateId);
		}
		Long count = aclModuleMapper.selectCount(query1);
		if (count >= 1) {
			return true;
		}else {
			return false;
		}
	}

	/**
	 * 获取当前权限模块所在层级的level
	 * @param surrogateId
	 * @return
	 */
	private SysAclModule getParentAclModule(Long surrogateId) {
		QueryWrapper<SysAclModule> query = new QueryWrapper<>();
		query.eq("surrogate_id", surrogateId);
		SysAclModule aclModule = aclModuleMapper.selectOne(query);
		if (Objects.isNull(aclModule)) {
			return null;
		}
		return aclModule;
	}

	/**
	 * 修改权限模块信息
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<String> editAclModule(AclModuleReq req) {
		/**
		 * 检查权限模块名是否相同
		 */
//		if (checkAclModuleExist(req.getParentSurrogateId(), req.getName(), req.getSurrogateId())) {
//			return ApiResp.failure("待修改的权限模块名不能重复");
//		}

		SysAclModule parentAclModule = getParentAclModule(req.getParentSurrogateId());
		if (Objects.isNull(parentAclModule)) {
			return ApiResp.failure(DATA_INFO_UNUSUAL);
		}

		// 检查待更新的权限模块是否存在
		QueryWrapper<SysAclModule> query1 = new QueryWrapper();
		query1.eq("surrogate_id",req.getSurrogateId());
		SysAclModule before = aclModuleMapper.selectOne(query1);
		Preconditions.checkNotNull(before, "待更新的权限模块不存在");

		// 更新当前的权限模块
		SysAclModule after = SysAclModule.builder()
			.id(before.getId())
			.surrogateId(before.getSurrogateId())
			.name(req.getName())
			.parentId(parentAclModule.getSurrogateId())
			.parentName(parentAclModule.getName())
			.seq(req.getSeq())
			.level(LevelUtil.calculateLevel(parentAclModule.getLevel(), parentAclModule.getId()))
			.remark(req.getRemark())
			.updateTime(DateUtil.localDateTimeNow())
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.build();

		// 更新子组织信息
		this.updateWithChildAclModule(before,after);
		return ApiResp.success("更新权限模块成功");
	}


	/**
	 * 更新当前权限模块的子权限模块信息
	 * @param before 旧权限模块
	 * @param after 新权限模块
	 */
	@Transactional
	public void updateWithChildAclModule(SysAclModule before, SysAclModule after) {
		// 修改当前权限模块
		aclModuleMapper.updateById(after);

		// 更新当前权限模块的子权限模块
		String newLevelPrefix = after.getLevel();// 0.1.3
		String oldLevelPrefix = before.getLevel();// 0.1
		if (!newLevelPrefix.equals(oldLevelPrefix)) {// 不一致需要做子组织的更新
			this.updateChildAclModuleTree(after);
		}
	}

	/**
	 * 递归变更组织树层级, 并维护子组织的level
	 * @param afterAclModule
	 */
	protected void updateChildAclModuleTree(SysAclModule afterAclModule) {
		// 查询当前组织的子组织
		List<SysAclModule> aclModuleList = aclModuleMapper.selectChildAclModuleListByParentId(afterAclModule.getSurrogateId());

		if (CollectionUtils.isEmpty(aclModuleList)) {
			return;
		}

		aclModuleList.forEach(aclModule -> {
			aclModule.setLevel(LevelUtil.calculateLevel(afterAclModule.getLevel(),afterAclModule.getId()));
			aclModule.setUpdateTime(DateUtil.localDateTimeNow());
			updateChildAclModuleTree(aclModule);
		});
		// 操作db
		this.updateBatchById(aclModuleList);
	}

	/**
	 * 获取模块权限树
	 * @return
	 */
	@Override
	public ApiResp aclModuleTree() {
		List<AclModuleDto> aclModuleDtoList = treeService.aclModuleTree();
		return ApiResp.success(aclModuleDtoList);
	}

	/**
	 * 删除权限模块信息
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp delete(AclModuleDelReq req) {
		QueryWrapper<SysAclModule> query = new QueryWrapper<>();
		query.eq("surrogate_id",req.getSurrogateId());
		SysAclModule aclModule = aclModuleMapper.selectOne(query);
		if (Objects.isNull(aclModule)) {
			return ApiResp.failure("待删除的权限模块不存在");
		}

		// 检查要删除的权限模块下是否还有子权限模块
		QueryWrapper<SysAclModule> query1 = new QueryWrapper<>();
		query1.eq("parent_id", req.getSurrogateId());
		Long count = aclModuleMapper.selectCount(query1);
		if (count >= 1) {
			return ApiResp.failure("待删除的权限模块还存在子权限模块, 无法删除");
		}

		Long aclCount = aclService.getAclCount(req.getSurrogateId());
		if (aclCount >= 1) {
			return ApiResp.failure("待删除的权限模块下还存在权限点, 无法删除");
		}

		aclModuleMapper.deleteById(aclModule.getId());
		return ApiResp.success("删除权限模块成功");
	}

	/**
	 * 获取单个权限模块对象
	 * @param surrogateId
	 * @return
	 */
	@Override
	public ApiResp<SysAclModuleVO> getAclModule(Long surrogateId) {
		QueryWrapper<SysAclModule> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("surrogate_id", surrogateId);
		SysAclModule aclModule = aclModuleMapper.selectOne(queryWrapper);
		if (Objects.isNull(aclModule)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}
		SysAclModuleVO aclModuleVO = new SysAclModuleVO();
		BeanUtils.copyProperties(aclModule, aclModuleVO);
		return ApiResp.success(aclModuleVO);
	}

	/**
	 * 查询所有的权限模块列表
	 * @return
	 */
	@Override
	public ApiResp<List<SysAclModuleVO>> aclModuleList(AclModuleListReq req) {
		List<SysAclModuleVO> sysAclModules = aclModuleMapper.selectAclModuleList(req);
		return ApiResp.success(sysAclModules);
	}
}
