package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.blog.BlogContentMongo;
import com.cy.single.blog.pojo.req.blog.content.BlogContentPageReq;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.pojo.resp.blog.BlogContentGroupResp;
import com.cy.single.blog.pojo.resp.blog.BlogContentResp;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogContentService {

  ApiResp<String> add(BlogContentReq req);

  BlogContentMongo saveBlogContentMongo(BlogContentMongo entity);

  PageResult<BlogContentResp> pageContentList(BlogContentPageReq req);

  PageResult<BlogContentResp> contentList(BlogContentPageReq req);

  ApiResp<BlogContentResp> get(Long surrogateId);

  ApiResp<String> edit(BlogContentReq req);

  ApiResp<String> publishBlog(BlogContentReq req);

  ApiResp<BlogContentResp> getContent(Long blogId);

  ApiResp<List<BlogContentResp>> frontContentList();

  List<BlogContentGroupResp> frontContentByGroupCategory();

  PageResult<BlogContentResp> frontContentPageList(BlogContentPageReq req);

	ApiResp<String> delete(Long surrogateId);
}
