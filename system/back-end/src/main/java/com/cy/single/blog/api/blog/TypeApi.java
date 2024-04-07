package com.cy.single.blog.api.blog;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.type.BlogTypePageReq;
import com.cy.single.blog.pojo.req.blog.type.BlogTypeReq;
import com.cy.single.blog.pojo.vo.blog.BlogTypeVO;
import com.cy.single.blog.service.BlogTypeService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import static com.cy.single.blog.utils.checkUtil.ParamValidator.checkSurrogateIds;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description: blog type api
 */
@Slf4j
@RestController
@RequestMapping("/blog/type")
public class TypeApi {

    @Autowired
    private BlogTypeService blogTypeService;

    @RecordLogger
    @CheckAuth
    @PostMapping("/pageTypeList")
    public ApiResp<PageResult<BlogTypeVO>> pageTypeList(@RequestBody @Valid BlogTypePageReq req) {
        PageResult<BlogTypeVO> list = blogTypeService.pageTypeList(req);
        return ApiResp.success(list);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/save")
    public ApiResp<String> save(@RequestBody @Validated({BlogTypeReq.GroupTypeSave.class}) BlogTypeReq req) {
        return blogTypeService.save(req);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/edit")
    public ApiResp<String> edit(@RequestBody @Validated({BlogTypeReq.GroupTypeEdit.class}) BlogTypeReq req) {
        return blogTypeService.edit(req);
    }

    @RecordLogger
    @CheckAuth
    @DeleteMapping("/delete")
    public ApiResp<String> delete(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
        return blogTypeService.delete(surrogateId);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/deleteBatch")
    public ApiResp<String> deleteBatch(@RequestBody @Validated({BlogTypeReq.GroupTypeDelBatch.class}) BlogTypeReq req) {
        if (CollectionUtils.isEmpty(req.getSurrogateIds())) return ApiResp.failure("surrogateIds不能为空");
        if (!checkSurrogateIds(req.getSurrogateIds())) return ApiResp.failure("surrogateIds不规范");
        return blogTypeService.deleteBatch(req);
    }
}
