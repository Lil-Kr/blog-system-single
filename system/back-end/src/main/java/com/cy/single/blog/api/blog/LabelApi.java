package com.cy.single.blog.api.blog;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelPageReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import com.cy.single.blog.service.BlogLabelService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.cy.single.blog.utils.checkUtil.ParamValidator.checkSurrogateIds;

/**
 * @Author: Lil-K
 * @Date: 2024/3/30
 * @Description: blog label api
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
    public ApiResp<PageResult<BlogLabelVO>> pageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) BlogLabelPageReq req) {
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
    public ApiResp<String> save(@RequestBody @Validated({BlogLabelReq.GroupLabelSave.class}) BlogLabelReq req) {
        return blogLabelService.save(req);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/edit")
    public ApiResp<String> edit(@RequestBody @Validated({BlogLabelReq.GroupLabelSave.class}) BlogLabelReq req) {
        return blogLabelService.edit(req);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/delete")
    public ApiResp<String> delete(@RequestBody @Validated({BlogLabelReq.GroupLabelDel.class}) BlogLabelReq req) {
        return blogLabelService.delete(req);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/deleteBatch")
    public ApiResp<String> deleteBatch(@RequestBody @Validated({BlogLabelReq.GroupLabelDelBatch.class}) BlogLabelReq req) {
        if (CollectionUtils.isEmpty(req.getSurrogateIds())) return ApiResp.failure("surrogateIds不能为空");
        if (!checkSurrogateIds(req.getSurrogateIds())) return ApiResp.failure("surrogateIds不规范");
        return blogLabelService.deleteBatch(req);
    }

}