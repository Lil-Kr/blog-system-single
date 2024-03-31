package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.req.blog.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.BlogLabelReq;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;

import java.util.List;

/**
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogLabelService {

    List<BlogLabel> pageList(BlogLabelListReq req);

    ApiResp<List<BlogLabelVO>> list(BlogLabelListReq req);

    ApiResp<String> save(BlogLabelReq req);

    ApiResp<String> edit(BlogLabelReq req);

    ApiResp<String> delete(BlogLabelReq req);
}
