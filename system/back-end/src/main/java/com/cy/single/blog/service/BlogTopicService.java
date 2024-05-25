package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicPageReq;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicReq;
import com.cy.single.blog.pojo.vo.blog.BlogTopicVO;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogTopicService {

  PageResult<BlogTopicVO> pageTopicList(BlogTopicPageReq req);

  PageResult<BlogTopicVO> topicList(BlogTopicReq req);

  ApiResp<String> save(BlogTopicReq req);

  ApiResp<String> edit(BlogTopicReq req);

  ApiResp<String> delete(Long surrogateId);

  ApiResp<String> deleteBatch(BlogTopicReq req);
}
