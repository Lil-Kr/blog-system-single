package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.BlogLabelMapper;
import com.cy.single.blog.pojo.dto.blog.BlogLabelDTO;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelPageReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import com.cy.single.blog.pojo.resp.blog.BlogLabelResp;
import com.cy.single.blog.service.BlogLabelService;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.common.constants.CommonConstants.*;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @author Lil-K
 * @since 2024-03-31
 */
@Service
public class BlogLabelServiceImpl implements BlogLabelService {

	@Autowired
	private BlogLabelMapper blogLabelMapper;

	@Autowired
	private CacheService cacheService;

	@Override
	public PageResult<BlogLabelResp> pageList(BlogLabelPageReq req) {
		List<BlogLabelResp> pageList = blogLabelMapper.pageList(req);
		Integer count = blogLabelMapper.getCountByList(req);
		if (CollectionUtils.isEmpty(pageList)) {
			return new PageResult<>(new ArrayList<>(0), 0);
		}else {
			return new PageResult<>(pageList, count);
		}
	}

	@Override
	public PageResult<BlogLabel> list(BlogLabelListReq req) {
		/**
		 * 先查询缓存, 在查询列表
		 */
		List<BlogLabel> labelList = cacheService.getLabelListCache(CACHE_KEY_BLOG_LABEL_LIST);
		if (CollectionUtils.isEmpty(labelList)) {
			labelList = blogLabelMapper.labelList(req);
			cacheService.saveLabelCache(CACHE_KEY_BLOG_LABEL_LIST, labelList);
		}

		if (CollectionUtils.isEmpty(labelList)) {
			return new PageResult<>(new ArrayList<>(0), 0);
		}
		return new PageResult<>(labelList, labelList.size());
	}

	@Override
	public ApiResp<String> add(BlogLabelReq req) {
		BlogLabel saveEntity = BlogLabelDTO.convertSaveLabelReq(req);
		int add = blogLabelMapper.insert(saveEntity);
		if (add < 1) {
			return ApiResp.failure(Add_ERROR);
		}

		// update cache
		cacheService.updateLabelCache(CACHE_KEY_BLOG_LABEL_LIST, BUS_CREATE, saveEntity);
		return ApiResp.success();
	}

	@Override
	public ApiResp<String> edit(BlogLabelReq req) {
		QueryWrapper<BlogLabel> query = new QueryWrapper<>();
		query.eq("surrogate_id", req.getSurrogateId());
		BlogLabel before = blogLabelMapper.selectOne(query);
		if (Objects.isNull(before)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}

		req.setUpdateTime(DateUtil.localDateTimeNow());
		req.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
		Integer count = blogLabelMapper.editBySurrogateId(req);

		if (count < 1) {
			return ApiResp.failure(EDITE_ERROR);
		}

		// update cache
		BeanUtils.copyProperties(req, before);
		cacheService.updateLabelCache(CACHE_KEY_BLOG_LABEL_LIST, BUS_EDIT, before);
		return ApiResp.success();
	}

	@Override
	public ApiResp<String> delete(BlogLabelReq req) {
		int count = blogLabelMapper.deleteBySurrogateId(req.getSurrogateId());
		if (count < 1) {
			return ApiResp.failure(OPERATE_ERROR);
		}
		cacheService.updateLabelCache(CACHE_KEY_BLOG_LABEL_LIST, BUS_DELETE, new BlogLabel());
		return ApiResp.success();
	}

	@Override
	public ApiResp<String> deleteBatch(BlogLabelReq req) {
		Integer count = blogLabelMapper.deleteBatch(req.getSurrogateIds());
		if (count < 1) {
			return ApiResp.failure(OPERATE_ERROR);
		}
		return ApiResp.success();
	}
}
