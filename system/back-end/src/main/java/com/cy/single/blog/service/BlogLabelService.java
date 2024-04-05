package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.BlogLabelPageReq;
import com.cy.single.blog.pojo.req.blog.BlogLabelReq;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;

/**
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogLabelService {

    PageResult<BlogLabelVO> pageList(BlogLabelPageReq req);

    PageResult<BlogLabelVO> list(BlogLabelListReq req);

    ApiResp<String> save(BlogLabelReq req);

    ApiResp<String> edit(BlogLabelReq req);

    ApiResp<String> delete(BlogLabelReq req);

    ApiResp<String> deleteBatch(BlogLabelReq req);
}
