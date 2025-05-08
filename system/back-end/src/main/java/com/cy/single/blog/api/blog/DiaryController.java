package com.cy.single.blog.api.blog;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.diary.DiaryPageListReq;
import com.cy.single.blog.pojo.req.blog.diary.DiarySaveReq;
import com.cy.single.blog.pojo.resp.blog.BlogDiaryPageListResp;
import com.cy.single.blog.service.BlogDiaryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2025/5/8
 * @Description:
 */
@Slf4j
@RestController
@RequestMapping("/blog/diary")
public class DiaryController {

  @Autowired
  private BlogDiaryService diaryService;

  @CheckAuth
  @RecordLogger
  @PostMapping("/pageList")
  public ApiResp<PageResult<BlogDiaryPageListResp>> pageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) DiaryPageListReq req) {
    PageResult<BlogDiaryPageListResp> pageList = diaryService.pageDiaryList(req);
    return ApiResp.success(pageList);
  }

  @CheckAuth
  @RecordLogger
  @PostMapping("/add")
  public ApiResp<String> add(@RequestBody @Validated(DiarySaveReq.GroupAdd.class) DiarySaveReq req) {
    return diaryService.add(req);
  }

  @CheckAuth
  @RecordLogger
  @PostMapping("/edit")
  public ApiResp<String> edit(@RequestBody @Validated(DiarySaveReq.GroupEdit.class) DiarySaveReq req) {
    return diaryService.edit(req);
  }

  @CheckAuth
  @RecordLogger
  @DeleteMapping("/delete/{id}")
  public ApiResp<String> delete(@PathVariable("id") @Valid @NotNull(message = "id cant not be null") Long id) {
    return diaryService.delete(id);
  }

  /** ================== 门户网站 [时间轴] 接口 =============== **/

  @RecordLogger
  @GetMapping("/frontContentList/{currentPageNum}/{pageSize}")
  public ApiResp<PageResult<BlogDiaryPageListResp>> frontDiaryList(
    @PathVariable("currentPageNum")
    @NotNull(groups = {BasePageReq.GroupPageQuery.class}, message = "current page number cant not be null")
    @Min(groups = {BasePageReq.GroupPageQuery.class}, value = 1, message ="page number cant not less than 1")
    @Max(groups = {BasePageReq.GroupPageQuery.class}, value = 10, message ="page number cant not greater than 10") Integer currentPageNum,

    @PathVariable("pageSize")
    @NotNull(groups = {BasePageReq.GroupPageQuery.class}, message = "page size cant not be null")
    @Max(groups = {BasePageReq.GroupPageQuery.class}, value = 100, message = "page size cant not greater than 100") Integer pageSize
  ) {
    DiaryPageListReq req = new DiaryPageListReq();
    req.setCurrentPageNum(currentPageNum);
    req.setPageSize(pageSize);
    PageResult<BlogDiaryPageListResp> pageList = diaryService.pageDiaryList(req);
    return ApiResp.success(pageList);
  }
}