package com.cy.single.blog.api.blog;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.service.BlogContentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: Lil-K
 * @Date: 2024/4/24
 * @Description:
 */
@Slf4j
@RestController
@RequestMapping("/blog/content")
public class ContentApi {

  @Autowired
  private BlogContentService blogContentService;

  @RecordLogger
  @CheckAuth
  @PostMapping("/save")
  public ApiResp<String> save(@RequestBody @Validated({BlogContentReq.GroupBlogContentSave.class}) BlogContentReq req) {
    blogContentService.save(req);
    return ApiResp.success();
  }


}
