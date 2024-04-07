package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.dao.BlogLabelMapper;
import com.cy.single.blog.pojo.dto.blog.BlogLabelDTO;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelPageReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import com.cy.single.blog.service.BlogLabelService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @author Lil-K
 * @since 2024-03-31
 */
@Service
public class BlogLabelServiceImpl implements BlogLabelService {

    @Autowired
    private BlogLabelMapper blogLabelMapper;

    @Override
    public PageResult<BlogLabelVO> pageList(BlogLabelPageReq req) {
        List<BlogLabelVO> pageList = blogLabelMapper.pageList(req);
        Integer count = blogLabelMapper.getCountByList(req);
        if (CollectionUtils.isEmpty(pageList)) {
            return new PageResult<>(new ArrayList<>(0), 0);
        }else {
            return new PageResult<>(pageList, count);
        }
    }

    @Override
    public PageResult<BlogLabelVO> list(BlogLabelListReq req) {
        List<BlogLabelVO> blogLabels = blogLabelMapper.getLabelList(req);
        if (CollectionUtils.isEmpty(blogLabels)) {
            return new PageResult<>(new ArrayList<>(0), 0);
        }else {
            return new PageResult<>(blogLabels, blogLabels.size());
        }
    }

    @Override
    public ApiResp<String> save(BlogLabelReq req) {
        BlogLabel saveEntity = BlogLabelDTO.convertSaveLabelReq(req);
        Integer save = blogLabelMapper.insert(saveEntity);
        if (save >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(SAVE_ERROR);
        }
    }

    @Override
    public ApiResp<String> edit(BlogLabelReq req) {
        Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
        req.setUpdateTime(nowDateTime);
        Integer count = blogLabelMapper.editBySurrogateId(req);
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(SAVE_ERROR);
        }
    }

    @Override
    public ApiResp<String> delete(BlogLabelReq req) {
        int count = blogLabelMapper.deleteBySurrogateId(req.getSurrogateId());
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(OPERATE_ERROR);
        }
    }

    @Override
    public ApiResp<String> deleteBatch(BlogLabelReq req) {
        Integer count = blogLabelMapper.deleteBatch(req.getSurrogateIds());
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(OPERATE_ERROR);
        }
    }
}
