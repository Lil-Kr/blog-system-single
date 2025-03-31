package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryReq;
import com.cy.single.blog.pojo.resp.blog.BlogCategoryResp;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description:
 */
public interface BlogCategoryService {

    PageResult<BlogCategoryResp> pageCategoryList(BlogCategoryPageReq req);

    PageResult<BlogCategoryResp> list(BlogCategoryPageReq req);

    ApiResp<String> add(BlogCategoryReq req);

    ApiResp<String> edit(BlogCategoryReq req);

    ApiResp<String> delete(Long surrogateId);

    ApiResp<String> deleteBatch(BlogCategoryReq req);

    List<BlogCategoryResp> frontList();
}
