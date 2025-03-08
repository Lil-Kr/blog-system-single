package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysOrgMapper;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.pojo.dto.sys.org.OrgLevelDto;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.org.OrgPageReq;
import com.cy.single.blog.pojo.req.org.OrgReq;
import com.cy.single.blog.pojo.vo.sys.org.SysOrgVO;
import com.cy.single.blog.service.SysOrgService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.cy.single.blog.utils.orgUtil.LevelUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.common.constants.SysOrgConstants.*;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2025/3/3
 * @Description: org service
 */
@Service
public class SysOrgServiceImpl extends ServiceImpl<SysOrgMapper, SysOrg> implements SysOrgService {

	@Autowired
	private SysOrgMapper orgMapper;

	@Autowired
	private SysUserMapper userMapper;

	@Autowired
	private SysTreeServiceImpl treeService;

	@Override
	public ApiResp<String> add(OrgReq req) {
		/**
		 * check repeat org id
		 */
		if (checkOrgExist(req.getParentSurrogateId(), req.getName(), req.getSurrogateId())) {
			return ApiResp.failure(DATA_INFO_REPEAT);
		}

		/**
		 * calculate level
		 * first level is 0
		 * **/
		SysOrg orgLevel = getLevel(req.getParentSurrogateId());
		String level = LevelUtil.calculateLevel(Objects.isNull(orgLevel) ? null : orgLevel.getLevel(), orgLevel.getId());

		/**
		 * build entity for add
		 */
		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeToDate(LocalDateTime.now());// current time
		SysOrg org = SysOrg.builder()
			.surrogateId(surrogateId)
			.number(ORG_PREV_NUMBER_INFO + surrogateId)
			.parentId(req.getParentSurrogateId())
			.seq(req.getSeq())
			.level(level)
			.name(req.getName())
			.remark(req.getRemark())
			.status(req.getStatus()) // default 0
			.deleted(0) // default 0
			.createTime(currentTime)
			.updateTime(currentTime)
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.build();

		int insert = orgMapper.insert(org);
		if (insert >= 1) {
			return ApiResp.success();
		} else {
			return ApiResp.failure(OPERATE_ERROR);
		}
	}

	/**
	 * check org not repeat in same level
	 * @param parentId
	 * @param orgName
	 * @param SurrogateId
	 * @return
	 */
	private boolean checkOrgExist(Long parentId, String orgName, Long SurrogateId) {
		QueryWrapper<SysOrg> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("parent_id", parentId);
		if (Objects.nonNull(orgName)) {
			queryWrapper.eq("name", orgName);
		}
		if (Objects.nonNull(SurrogateId)) {
			queryWrapper.eq("surrogate_id", SurrogateId);
		}
		Long count = orgMapper.selectCount(queryWrapper);
		if (count >= 1) {
			return true;
		}else {
			return false;
		}
	}

	/**
	 * get current org level`s level
	 * @param orgId
	 * @return
	 */
	private SysOrg getLevel(Long orgId) {
		QueryWrapper<SysOrg> query = new QueryWrapper<>();
		query.eq("surrogate_id", orgId);
		SysOrg org = orgMapper.selectOne(query);
		if (Objects.isNull(org)) {
			return null;
		}
		return org;
	}

	/**
	 * edit org info
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<String> edit(OrgReq req) {
		// 检查组织名是否重复
//		if (checkOrgExist(req.getParentSurrogateId(), req.getName(), req.getSurrogateId())) {
//			return ApiResp.failure(DATA_INFO_REPEAT);
//		}

		// 检查待更新的组织是否存在
		QueryWrapper<SysOrg> wrapper = new QueryWrapper<>();
		wrapper.eq("surrogate_id", req.getSurrogateId());
		SysOrg before = orgMapper.selectOne(wrapper);
		if (Objects.isNull(before)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}

		SysOrg orgTemp = getLevel(req.getParentSurrogateId());
		// 更新当前组织
		SysOrg after = SysOrg.builder()
			.id(before.getId())
			.surrogateId(before.getSurrogateId())
			.name(req.getName())
			.parentId(req.getParentSurrogateId())// 上级组织id
			.seq(req.getSeq())
			.level(LevelUtil.calculateLevel(Objects.isNull(orgTemp) ? null : orgTemp.getLevel(), orgTemp.getId()))
			.remark(req.getRemark())
			.updateTime(DateUtil.localDateTimeToDate(LocalDateTime.now()))
			.operator(RequestHolder.getCurrentUser().getSurrogateId())
			.operateIp("127.0.0.1")
			.build();

		/** 更新子组织信息 **/
		this.updateWithChildOrg(before,after);
		return ApiResp.success();
	}

	/**
	 * 更新当前组织的子组织信息
	 * @param before 旧组织
	 * @param after 新组织
	 */
	@Transactional
	public void updateWithChildOrg(SysOrg before, SysOrg after) {
		// 修改当前组织信息
		orgMapper.updateById(after);
		// 更新当前组织的子组织
		String newLevelPrefix = after.getLevel();// 0.1.3
		String oldLevelPrefix = before.getLevel();// 0.1
		if (!newLevelPrefix.equals(oldLevelPrefix)) {// 不一致需要做子组织的更新
			this.updateChildOrgTree(after);
		}
	}

	/**
	 * 递归变更组织树层级, 并维护子组织的level
	 */
	protected void updateChildOrgTree(SysOrg afterOrg) {
		List<SysOrg> orgList = orgMapper.selectChildOrgListByParentId(afterOrg.getSurrogateId());
		if (CollectionUtils.isEmpty(orgList)) {
			return;
		}
		Date now = DateUtil.localDateTimeNow();
		orgList.forEach(org -> {
			org.setLevel(LevelUtil.calculateLevel(afterOrg.getLevel(), afterOrg.getId()));
			org.setUpdateTime(DateUtil.localDateTimeToDate(LocalDateTime.now()));
			org.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
			org.setUpdateTime(now);
			updateChildOrgTree(org);
		});
		// 操作db
		this.updateBatchById(orgList);
	}

	@Override
	public PageResult<SysOrgVO> pageOrgList(OrgPageReq req) {
		req.setIsOrder(1);
		List<SysOrgVO> pageList = orgMapper.pageList(req);
		Integer count = orgMapper.countByList(req);
		if (CollectionUtils.isNotEmpty(pageList)) {
			return new PageResult<>(pageList, count);
		}else {
			return new PageResult<>(new ArrayList<>(0), 0);
		}
	}

	@Override
	public List<SysOrgVO> list(OrgListAllReq req) {
		List<SysOrgVO> list = orgMapper.retrieveAllList(req);
		return list;
	}


	/**
	 * retrieve child org list by surrogateId
	 * @param req
	 * @return
	 */
	@Override
	public PageResult<SysOrgVO> pageChildOrgList(OrgPageReq req) {
		List<SysOrgVO> pageList = orgMapper.pageChildOrgList(req);
		Integer count = orgMapper.childOrgListCount(req);
		if (CollectionUtils.isNotEmpty(pageList)) {
			return new PageResult<>(pageList, count);
		}else {
			return new PageResult<>(new ArrayList<>(0), 0);
		}
	}

	/**
	 * retrieve org tree list
	 * @return
	 */
	@Override
	public List<OrgLevelDto> orgTree() {
		List<OrgLevelDto> dtoList = treeService.orgTree();
		return dtoList;
	}

	/**
	 * org id will be calculator level, not surrogateId
	 * @param surrogateId
	 * @return
	 */
	@Override
	public ApiResp<String> delete(Long surrogateId) {
		QueryWrapper<SysOrg> query = new QueryWrapper<>();
		query.eq("surrogate_id", surrogateId);
		SysOrg org = orgMapper.selectOne(query);
		if (Objects.isNull(org)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}

		/**
		 * check will delete org include user
		 */
		QueryWrapper<SysUser> queryWrapperUser = new QueryWrapper<>();
		queryWrapperUser.eq("org_id", surrogateId);
		Long userCount = userMapper.selectCount(queryWrapperUser);
		if (userCount >= 1) {
			return ApiResp.failure(ORG_DELETE_ERROR_INFO);
		}

		/**
		 * check will delete org is or not children
		 */
		QueryWrapper<SysOrg> query2 = new QueryWrapper<>();
		query2.eq("parent_id", surrogateId);
		Long count = orgMapper.selectCount(query2);
		if (count >= 1) {
			return ApiResp.failure(ORG_DELETE_EXIST_INFO);
		}

		int delete = orgMapper.deleteById(org.getId());
		if (delete >= 1) {
			return ApiResp.success();
		} else {
			return ApiResp.failure(OPERATE_ERROR);
		}
	}

}
