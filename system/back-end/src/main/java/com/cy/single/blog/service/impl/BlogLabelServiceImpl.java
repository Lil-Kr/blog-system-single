package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.dao.BlogLabelMapper;
import com.cy.single.blog.dao.BlogTypeMapper;
import com.cy.single.blog.pojo.dto.req.BlogDTO;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.req.blog.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.BlogLabelReq;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import com.cy.single.blog.service.BlogLabelService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static com.cy.single.blog.enums.ReturnCodeEnum.DEL_ERROR;
import static com.cy.single.blog.enums.ReturnCodeEnum.SAVE_ERROR;

/**
 * @author Lil-K
 * @since 2024-03-31
 */
@Service
public class BlogLabelServiceImpl implements BlogLabelService {

    @Autowired
    private BlogTypeMapper blogTypeMapper;

    @Autowired
    private BlogLabelMapper blogLabelMapper;

    @Override
    public List<BlogLabel> pageList(BlogLabelListReq req) {
        return null;
    }

    @Override
    public ApiResp<List<BlogLabelVO>> list(BlogLabelListReq req) {
//        BlogLabel queryLabel = BlogDTO.convertQueryLabelReq(req);
//        Wrapper<BlogLabel> wrapper = new QueryWrapper<>(queryLabel);
//        List<BlogLabel> blogLabels = blogLabelMapper.selectList(wrapper);
        List<BlogLabelVO> blogLabels = blogLabelMapper.getLabelList(req);


        if (CollectionUtils.isEmpty(blogLabels)) {
            return ApiResp.success(Collections.emptyList());
        }else {
//            List<BlogLabelVO> res = BlogDTO.convertLabelsToVO(blogLabels);
            return ApiResp.success(blogLabels);
        }
    }

    @Override
    public ApiResp<String> save(BlogLabelReq req) {
        BlogLabel saveEntity = BlogDTO.convertSaveLabelReq(req);
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
//        BlogLabel delEntity = BlogDTO.convertDelLabelReq(req);
//        Wrapper<BlogLabel> wrapper = new QueryWrapper<>(delEntity);
        int count = blogLabelMapper.deleteBySurrogateId(req.getSurrogateId());
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(DEL_ERROR);
        }
    }

    @Override
    public ApiResp<String> deleteBatch(BlogLabelReq req) {
        List<String> list = Arrays.asList(req.getSurrogateId().split(","));
        Integer count = blogLabelMapper.deleteBatch(list);
        if (count >= 1) {
            return ApiResp.success();
        }else {
            return ApiResp.failure(DEL_ERROR);
        }
    }
}
