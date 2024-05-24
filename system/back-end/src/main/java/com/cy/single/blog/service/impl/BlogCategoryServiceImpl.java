package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.dao.BlogCategoryMapper;
import com.cy.single.blog.pojo.dto.blog.BlogCategoryDTO;
import com.cy.single.blog.pojo.entity.blog.BlogCategory;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryReq;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;
import com.cy.single.blog.service.BlogCategoryService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description:
 */
@Slf4j
@Service
public class BlogCategoryServiceImpl implements BlogCategoryService {

    @Autowired
    private BlogCategoryMapper blogCategoryMapper;

    @Override
    public PageResult<BlogCategoryVO> pageTypeList(BlogCategoryPageReq req) {
        List<BlogCategoryVO> pageList = blogCategoryMapper.pageTypeList(req);
        Integer count = blogCategoryMapper.getCountByList(req);
        if (CollectionUtils.isEmpty(pageList)) {
            return new PageResult<>(new ArrayList<>(0), 0);
        }else {
            return new PageResult<>(pageList, count);
        }
    }

    @Override
    public ApiResp<String> save(BlogCategoryReq req) {
        BlogCategory blogCategoryRes = blogCategoryMapper.selectByNumber(req.getNumber());
        if (Objects.nonNull(blogCategoryRes)) {
            return ApiResp.failure(DATA_INFO_REPEAT);
        }else {
            blogCategoryRes = BlogCategory.builder().build();
        }

        BlogCategory saveEntity = BlogCategoryDTO.convertSaveCategoryReq(req, blogCategoryRes);
        Integer save = blogCategoryMapper.insert(saveEntity);
        if (save >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(SAVE_ERROR);
        }
    }

    @Override
    public ApiResp<String> edit(BlogCategoryReq req) {
        BlogCategory blogCategoryRes = blogCategoryMapper.selectBySurrogateId(req.getSurrogateId());
        if (Objects.isNull(blogCategoryRes)) {
            return ApiResp.failure(OPERATE_ERROR);
        }

        if (!blogCategoryRes.getNumber().equalsIgnoreCase(req.getNumber())) {
            return ApiResp.failure(OPERATE_ERROR);
        }

        BeanUtils.copyProperties(req, blogCategoryRes);
        Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
        blogCategoryRes.setUpdateTime(nowDateTime);
        Integer count = blogCategoryMapper.editBySurrogateId(blogCategoryRes);
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(SAVE_ERROR);
        }
    }

    @Override
    public ApiResp<String> delete(Long surrogateId) {
        int count = blogCategoryMapper.deleteBySurrogateId(surrogateId);
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(OPERATE_ERROR);
        }
    }

    @Override
    public ApiResp<String> deleteBatch(BlogCategoryReq req) {
        Integer count = blogCategoryMapper.deleteBatch(req.getSurrogateIds());
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(DEL_ERROR);
        }
    }
}
