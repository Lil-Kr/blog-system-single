package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.dao.SysDictDetailMapper;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.req.dict.DictDetailPageListReq;
import com.cy.single.blog.pojo.req.dict.SaveDictDetailReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictDetailVO;
import com.cy.single.blog.service.SysDictDetailService;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.base.Preconditions;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
@Service
@Slf4j
public class SysDictDetailServiceImpl extends ServiceImpl<SysDictDetailMapper, SysDictDetail> implements SysDictDetailService {

	@Autowired
	private SysDictDetailMapper dictDetailMapper;

	@Override
	public ApiResp<String> addDetail(SaveDictDetailReq req) {
		if (checkDetailExist(req.getSurrogateId(), req.getName(), req.getType())) {
			return ApiResp.failure("待新增的字典类型明细已存在");
		}

		Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
		SysDictDetail dictDetail = SysDictDetail.builder()
			.surrogateId(surrogateId)
			.parentId(req.getParentId())
			.name(req.getName())
			.type(req.getType())
			.remark(req.getRemark())
			.build();
		int insert = dictDetailMapper.insert(dictDetail);
		if (insert >= 1) {
			return ApiResp.success("新增字典明细成功");
		} else {
			return ApiResp.failure("新增字典明细失败");
		}
	}

	/**
	 * 检查是否存在相同的明细名称
	 * @param surrogateId
	 * @param name
	 * @return
	 */
	protected boolean checkDetailExist(Long surrogateId, String name, Integer type) {
		QueryWrapper<SysDictDetail> query = new QueryWrapper<>();
		if (Objects.nonNull(surrogateId)) {
			query.eq("surrogate_id",surrogateId);
		}
		query.eq("name", name);
		query.eq("type", type);
		Long count = dictDetailMapper.selectCount(query);
		if (count >= 1) {
			return true;
		}else {
			return false;
		}
	}

	/**
	 * 修改字典类型明细
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> editDetail(SaveDictDetailReq req) {
		if (checkDetailExist(req.getSurrogateId(), req.getName(), req.getType())) {
			return ApiResp.failure("待新增的字典类型明细已存在");
		}
		QueryWrapper<SysDictDetail> query = new QueryWrapper<>();
		query.eq("surrogate_id", req.getSurrogateId());
		SysDictDetail before = dictDetailMapper.selectOne(query);
		Preconditions.checkNotNull(before, "待更新的字典明细信息不存在");

		SysDictDetail after = SysDictDetail.builder()
			.surrogateId(req.getSurrogateId())
			.parentId(req.getParentId())
			.type(req.getType())
			.name(req.getName())
			.remark(req.getRemark())
			.build();
		int update = dictDetailMapper.update(after, query);
		if (update >= 1) {
			return ApiResp.success("修改字典明细信息成功");
		}else {
			return ApiResp.failure("修改字典明细信息失败");
		}
	}

	/**
	 * 删除字典明细
	 * @param surrogateId
	 * @return
	 * @throws Exception
	 */
	@Override
	public ApiResp<String> deleteDetail(Long surrogateId) {
		QueryWrapper<SysDictDetail> query = new QueryWrapper<>();
		query.eq("surrogate_id",surrogateId);
		int delete = dictDetailMapper.delete(query);
		if (delete >= 1) {
			return ApiResp.success("删除字典明细信息成功");
		}else {
			return ApiResp.failure("删除字典明细信息失败");
		}
	}

	/**
	 * 根据字典主表分页查询字典明细数据
	 * @param req
	 * @return
	 */
	@Override
	public PageResult<SysDictDetailVO> pageDictDetailList(DictDetailPageListReq req) {
		List<SysDictDetailVO> pageList = dictDetailMapper.pageDictDetailListById(req);
		Integer count = dictDetailMapper.countPageDictDetail(req);
		if (CollectionUtils.isEmpty(pageList)) {
			return new PageResult<>(new ArrayList<>(0), 0);
		}else {
			return new PageResult<>(pageList, count);
		}
	}
}
