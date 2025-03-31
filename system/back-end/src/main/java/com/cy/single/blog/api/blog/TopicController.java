package com.cy.single.blog.api.blog;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicPageReq;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicReq;
import com.cy.single.blog.pojo.resp.blog.BlogTopicResp;
import com.cy.single.blog.service.BlogTopicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2024/5/25
 * @Description:
 */
@Slf4j
@RestController
@RequestMapping("/blog/topic")
public class TopicController {

  @Autowired
  private BlogTopicService blogTopicService;

  @RecordLogger
  @CheckAuth
  @PostMapping("/pageTopicList")
  public ApiResp<PageResult<BlogTopicResp>> pageTopicList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) BlogTopicPageReq req) {
    PageResult<BlogTopicResp> blogTopicVOPageResult = blogTopicService.pageTopicList(req);
    return ApiResp.success(blogTopicVOPageResult);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/list")
  public ApiResp<PageResult<BlogTopic>> list(@RequestBody @Valid BlogTopicReq req) {
    PageResult<BlogTopic> blogTopicVOPageResult = blogTopicService.list(req);
    return ApiResp.success(blogTopicVOPageResult);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/add")
  public ApiResp<String> add(@RequestBody @Validated(BlogTopicReq.GroupBlogTopicSave.class) BlogTopicReq req) {
    return blogTopicService.add(req);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/edit")
  public ApiResp<String> edit(@RequestBody @Validated(BlogTopicReq.GroupBlogTopicEdit.class) BlogTopicReq req) {
    return blogTopicService.edit(req);
  }

  @RecordLogger
  @CheckAuth
  @DeleteMapping("/delete")
  public ApiResp<String> delete(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return blogTopicService.delete(surrogateId);
  }
}