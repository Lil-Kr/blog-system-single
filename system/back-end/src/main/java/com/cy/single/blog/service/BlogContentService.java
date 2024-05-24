package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogContentService {

  ApiResp<String> save(BlogContentReq req);
}
