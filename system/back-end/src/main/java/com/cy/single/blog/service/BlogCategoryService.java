package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryReq;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description:
 */
public interface BlogCategoryService {

    PageResult<BlogCategoryVO> pageTypeList(BlogCategoryPageReq req);

    ApiResp<String> save(BlogCategoryReq req);

    ApiResp<String> edit(BlogCategoryReq req);

    ApiResp<String> delete(Long surrogateId);

    ApiResp<String> deleteBatch(BlogCategoryReq req);
}
