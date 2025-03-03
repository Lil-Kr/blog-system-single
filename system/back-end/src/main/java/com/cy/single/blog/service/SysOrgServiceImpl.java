package com.cy.single.blog.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysOrgMapper;
import com.cy.single.blog.pojo.dto.org.OrgLevelDto;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.pojo.req.org.OrgDeleteParam;
import com.cy.single.blog.pojo.req.org.OrgGetChildrenParam;
import com.cy.single.blog.pojo.req.org.OrgListAllParam;
import com.cy.single.blog.pojo.req.org.OrgParam;
import com.cy.single.blog.pojo.resp.org.SysOrgVO;
import com.cy.single.blog.service.impl.SysTreeService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.cy.single.blog.utils.orgUtil.LevelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.common.constants.ResponseConstant.*;

/**
 * @Author: Lil-K
 * @Date: 2025/3/3
 * @Description: org service
 */
@Service
public class SysOrgServiceImpl implements SysOrgService {

	@Autowired
	private SysOrgMapper sysOrgMapper;

	@Autowired
	private SysTreeService sysTreeService;

	@Override
	public ApiResp<String> add(OrgParam param) {
		// 检查
		if (checkOrgExist(param.getParentSurrogateId(),param.getName(),param.getSurrogateId())) {
			return ApiResp.failure(ORG_ADD_ERROR_INFO);
		}

		/**计算层级**/
		String level = LevelUtil.calculateLevel(getLevel(param.getParentId()), param.getParentId());
		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		Date currentTime = DateUtil.localDateTimeToDate(LocalDateTime.now());// 当前时间
		SysOrg org = SysOrg.builder()
			.surrogateId(surrogateId)
			.number(ORG_PREV_NUMBER_INFO + surrogateId)
			.parentId(param.getParentSurrogateId())
			.seq(param.getSeq())
			.level(level)
			.name(param.getName())
			.remark(param.getRemark())
			.createTime(currentTime)
			.updateTime(currentTime)
			.operator(RequestHolder.getCurrentUser().getAccount())
			.operateIp("127.0.0.1")
			.build();

		int insert = sysOrgMapper.insert(org);
		if (insert >= 1) {
			return ApiResp.success(BASE_SUCCESS_INFO);
		} else {
			return ApiResp.failure(BASE_ERROR_INFO);
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
		queryWrapper.eq("parent_id",parentId);
		if (Objects.nonNull(orgName)) {
			queryWrapper.eq("name",orgName);
		}
		if (Objects.nonNull(SurrogateId)) {
			queryWrapper.eq("surrogate_id", SurrogateId);
		}
		Long count = sysOrgMapper.selectCount(queryWrapper);
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
	private String getLevel(Long orgId) {
		SysOrg org = sysOrgMapper.selectById(orgId);
		if (Objects.isNull(org)) {
			return null;
		}else {
			return org.getLevel();
		}
	}

	@Override
	public ApiResp<String> edit(OrgParam param) {
		return null;
	}

	@Override
	public PageResult<SysOrgVO> pageList(OrgListAllParam param) {
		return null;
	}

	@Override
	public PageResult<SysOrgVO> list(OrgListAllParam param) {
		return null;
	}

	@Override
	public PageResult<SysOrgVO> getChildrenOrgList(OrgGetChildrenParam dto) {
		return null;
	}

	@Override
	public ApiResp orgTree() {
		List<OrgLevelDto> dtoList = sysTreeService.orgTree();
		return ApiResp.success(dtoList);
	}

	@Override
	public ApiResp<String> delete(OrgDeleteParam dto) {
		return null;
	}
}
