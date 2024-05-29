package com.cy.single.blog.api.blog;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.content.BlogContentPageReq;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.pojo.vo.blog.BlogContentVO;
import com.cy.single.blog.service.BlogContentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

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
  @PostMapping("/pageContentList")
  public ApiResp<PageResult<BlogContentVO>> pageContentList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) BlogContentPageReq req) {
    PageResult<BlogContentVO> list = blogContentService.pageContentList(req);
    return ApiResp.success(list);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/list")
  public ApiResp<PageResult<BlogContentVO>> list(@RequestBody @Validated BlogContentPageReq req) {
    PageResult<BlogContentVO> list = blogContentService.contentList(req);
    return ApiResp.success(list);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/publish")
  public ApiResp<String> publishBlog(@RequestBody @Validated({BlogContentReq.GroupBlogContentPublish.class}) BlogContentReq req) {
    return blogContentService.publishBlog(req);
  }

  @RecordLogger
  @CheckAuth
  @GetMapping("/get")
  public ApiResp<BlogContentVO> get(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return blogContentService.get(surrogateId);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/save")
  public ApiResp<String> save(@RequestBody @Validated({BlogContentReq.GroupBlogContentSave.class}) BlogContentReq req) {
    return blogContentService.save(req);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/edit")
  public ApiResp<String> edit(@RequestBody @Validated({BlogContentReq.GroupBlogContentEdit.class}) BlogContentReq req) {
    ApiResp<String> res = blogContentService.edit(req);
    return ApiResp.success();
  }

  @RecordLogger
  @CheckAuth
  @DeleteMapping("/delete")
  public ApiResp<String> delete(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
//    return blogContentService.delete(surrogateId);
    return null;
  }

  /** ================== 门户网站接口 =============== **/
  @RecordLogger
  @GetMapping("/frontContentList")
  public ApiResp<List<BlogContentVO>> frontContentList() {
    return blogContentService.frontContentList();
  }

  @RecordLogger
  @PostMapping("/frontContentPageList")
  public ApiResp<PageResult<BlogContentVO>> frontContentPageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) BlogContentPageReq req) {
    PageResult<BlogContentVO> list = blogContentService.frontContentPageList(req);
    return ApiResp.success(list);
  }

  @RecordLogger
  @GetMapping("/frontGet")
  public ApiResp<BlogContentVO> frontGetBlog(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return blogContentService.get(surrogateId);
  }
}
