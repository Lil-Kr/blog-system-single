package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.blog.BlogContentMongo;
import com.cy.single.blog.pojo.req.blog.content.BlogContentPageReq;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.pojo.vo.blog.BlogContentGroupVO;
import com.cy.single.blog.pojo.vo.blog.BlogContentVO;

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

  ApiResp<String> save(BlogContentReq req);

  BlogContentMongo saveBlogContentMongo(BlogContentMongo entity);

  PageResult<BlogContentVO> pageContentList(BlogContentPageReq req);

  PageResult<BlogContentVO> contentList(BlogContentPageReq req);

  ApiResp<BlogContentVO> get(Long surrogateId);

  ApiResp<String> edit(BlogContentReq req);

  ApiResp<String> publishBlog(BlogContentReq req);

  ApiResp<BlogContentVO> getContent(Long blogId);

  ApiResp<List<BlogContentVO>> frontContentList();

  List<BlogContentGroupVO> frontContentByGroupCategory();

  PageResult<BlogContentVO> frontContentPageList(BlogContentPageReq req);

}
