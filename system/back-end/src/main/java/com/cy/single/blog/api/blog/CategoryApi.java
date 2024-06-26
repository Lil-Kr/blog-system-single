package com.cy.single.blog.api.blog;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.cache.CacheManager;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryReq;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;
import com.cy.single.blog.pojo.vo.blog.BlogContentGroupVO;
import com.cy.single.blog.service.BlogCategoryService;
import com.cy.single.blog.service.BlogContentService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import static com.cy.single.blog.utils.checkUtil.ParamValidator.checkSurrogateIds;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description: blog type api
 */
@Slf4j
@RestController
@RequestMapping("/blog/category")
public class CategoryApi {

    @Autowired
    private BlogCategoryService blogCategoryService;

    @Autowired
    private BlogContentService blogContentService;

    @RecordLogger
    @CheckAuth
    @PostMapping("/pageCategoryList")
    public ApiResp<PageResult<BlogCategoryVO>> pageCategoryList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) BlogCategoryPageReq req) {
        PageResult<BlogCategoryVO> list = blogCategoryService.pageCategoryList(req);
        return ApiResp.success(list);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/list")
    public ApiResp<PageResult<BlogCategoryVO>> list(@RequestBody @Validated BlogCategoryPageReq req) {
        PageResult<BlogCategoryVO> list = blogCategoryService.list(req);
        return ApiResp.success(list);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/save")
    public ApiResp<String> save(@RequestBody @Validated({BlogCategoryReq.GroupTypeSave.class}) BlogCategoryReq req) {
        return blogCategoryService.save(req);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/edit")
    public ApiResp<String> edit(@RequestBody @Validated({BlogCategoryReq.GroupTypeEdit.class}) BlogCategoryReq req) {
        return blogCategoryService.edit(req);
    }

    @RecordLogger
    @CheckAuth
    @DeleteMapping("/delete")
    public ApiResp<String> delete(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
        return blogCategoryService.delete(surrogateId);
    }

    @RecordLogger
    @CheckAuth
    @PostMapping("/deleteBatch")
    public ApiResp<String> deleteBatch(@RequestBody @Validated({BlogCategoryReq.GroupTypeDelBatch.class}) BlogCategoryReq req) {
        if (CollectionUtils.isEmpty(req.getSurrogateIds())) return ApiResp.failure("surrogateIds不能为空");
        if (!checkSurrogateIds(req.getSurrogateIds())) return ApiResp.failure("surrogateIds不规范");
        return blogCategoryService.deleteBatch(req);
    }

    /** =============== 门户网站接口 ===============**/
    @RecordLogger
    @GetMapping("/frontCategoryCountList")
    public ApiResp<List<BlogContentGroupVO>> frontCategoryCountList() {
        List<BlogContentGroupVO> blogContentGroupList = blogContentService.frontContentByGroupCategory();

        Map<Long, BlogCategoryVO> blogCategoryAllMapCache = CacheManager.getBlogCategoryAllMapCache();
        blogContentGroupList.forEach(item -> {
            item.setCategoryName(blogCategoryAllMapCache.getOrDefault(item.getCategoryId(), new BlogCategoryVO()).getName());
        });
        return ApiResp.success(blogContentGroupList);
    }

}
