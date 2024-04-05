package com.cy.single.blog.api.blog;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.BlogLabelPageReq;
import com.cy.single.blog.pojo.req.blog.BlogLabelReq;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import com.cy.single.blog.service.BlogLabelService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @Author: Lil-K
 * @Date: 2024/3/30
 * @Description: label
 */
@Slf4j
@RestController
@RequestMapping("/blog/label")
public class LabelApi {

    @Autowired
    private BlogLabelService blogLabelService;

    @RecordLogger
    @CheckAuth
    @PostMapping("/pageList")
    public ApiResp<PageResult<BlogLabelVO>> pageList(@RequestBody @Valid BlogLabelPageReq req) {
        PageResult<BlogLabelVO> list = blogLabelService.pageList(req);
        return ApiResp.success(list);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/list")
    public ApiResp<PageResult<BlogLabelVO>> list(@RequestBody @Valid BlogLabelListReq req) {
        PageResult<BlogLabelVO> list = blogLabelService.list(req);
        return ApiResp.success(list);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/save")
    public ApiResp<String> save(@RequestBody @Validated({BlogLabelReq.GroupTypeSave.class}) BlogLabelReq req) {
        return blogLabelService.save(req);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/edit")
    public ApiResp<String> edit(@RequestBody @Validated({BlogLabelReq.GroupTypeSave.class}) BlogLabelReq req) {
        return blogLabelService.edit(req);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/delete")
    public ApiResp<String> delete(@RequestBody @Validated({BlogLabelReq.GroupTypeDel.class}) BlogLabelReq req) {
        return blogLabelService.delete(req);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/deleteBatch")
    public ApiResp<String> deleteBatch(@RequestBody @Validated({BlogLabelReq.GroupTypeDelBatch.class}) BlogLabelReq req) {
        return blogLabelService.deleteBatch(req);
    }

}