package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.dao.BlogContentMapper;
import com.cy.single.blog.pojo.dto.blog.BlogContentDTO;
import com.cy.single.blog.pojo.entity.blog.BlogContent;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.service.BlogContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
@Service
public class BlogContentServiceImpl implements BlogContentService {

  @Autowired
  private BlogContentMapper blogContentMapper;

  @Override
  public ApiResp<String> save(BlogContentReq req) {
    BlogContent blogContent = BlogContentDTO.convertSaveBlogContentReq(req);
    int insert = blogContentMapper.insert(blogContent);
    if (insert > 1) {
      return ApiResp.success();
    }else {
      return ApiResp.failure();
    }

  }
}
