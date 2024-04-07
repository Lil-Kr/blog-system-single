package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.dao.BlogTypeMapper;
import com.cy.single.blog.pojo.dto.blog.BlogTypeDTO;
import com.cy.single.blog.pojo.entity.blog.BlogType;
import com.cy.single.blog.pojo.req.blog.type.BlogTypePageReq;
import com.cy.single.blog.pojo.req.blog.type.BlogTypeReq;
import com.cy.single.blog.pojo.vo.blog.BlogTypeVO;
import com.cy.single.blog.service.BlogTypeService;
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
public class BlogTypeServiceImpl implements BlogTypeService {

    @Autowired
    private BlogTypeMapper blogTypeMapper;

    @Override
    public PageResult<BlogTypeVO> pageTypeList(BlogTypePageReq req) {
        List<BlogTypeVO> pageList = blogTypeMapper.pageTypeList(req);
        Integer count = blogTypeMapper.getCountByList(req);
        if (CollectionUtils.isEmpty(pageList)) {
            return new PageResult<>(new ArrayList<>(0), 0);
        }else {
            return new PageResult<>(pageList, count);
        }
    }

    @Override
    public ApiResp<String> save(BlogTypeReq req) {
        BlogType blogTypeRes = blogTypeMapper.selectByNumber(req.getNumber());
        if (Objects.nonNull(blogTypeRes)) {
            return ApiResp.failure(DATA_INFO_REPEAT);
        }else {
            blogTypeRes = BlogType.builder().build();
        }

        BlogType saveEntity = BlogTypeDTO.convertSaveTypeReq(req, blogTypeRes);
        Integer save = blogTypeMapper.insert(saveEntity);
        if (save >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(SAVE_ERROR);
        }
    }

    @Override
    public ApiResp<String> edit(BlogTypeReq req) {
        BlogType blogTypeRes = blogTypeMapper.selectBySurrogateId(req.getSurrogateId());
        if (Objects.isNull(blogTypeRes)) {
            return ApiResp.failure(OPERATE_ERROR);
        }

        if (!blogTypeRes.getNumber().equalsIgnoreCase(req.getNumber())) {
            return ApiResp.failure(OPERATE_ERROR);
        }

        BeanUtils.copyProperties(req, blogTypeRes);
        Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
        blogTypeRes.setUpdateTime(nowDateTime);
        Integer count = blogTypeMapper.editBySurrogateId(blogTypeRes);
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(SAVE_ERROR);
        }
    }

    @Override
    public ApiResp<String> delete(Long surrogateId) {
        int count = blogTypeMapper.deleteBySurrogateId(surrogateId);
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(OPERATE_ERROR);
        }
    }

    @Override
    public ApiResp<String> deleteBatch(BlogTypeReq req) {
        Integer count = blogTypeMapper.deleteBatch(req.getSurrogateIds());
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(DEL_ERROR);
        }
    }
}
