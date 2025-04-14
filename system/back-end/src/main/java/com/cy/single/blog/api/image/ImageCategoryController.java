package com.cy.single.blog.api.image;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.image.ImageCategoryListReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryPageListReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryReq;
import com.cy.single.blog.pojo.resp.image.ImageCategoryResp;
import com.cy.single.blog.service.ImageCategoryService;
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
@RequestMapping("/image/category")
public class ImageCategoryController {

  @Autowired
  private ImageCategoryService imageCategoryService;

  @RecordLogger
  @CheckAuth
  @PostMapping("/pageList")
  public ApiResp<PageResult<ImageCategoryResp>> pageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) ImageCategoryPageListReq req) {
    PageResult<ImageCategoryResp> blogTopicVOPageResult = imageCategoryService.pageList(req);
    return ApiResp.success(blogTopicVOPageResult);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/list")
  public ApiResp<PageResult<ImageCategoryResp>> list(@RequestBody @Valid ImageCategoryListReq req) {
    PageResult<ImageCategoryResp> blogTopicVOPageResult = imageCategoryService.list(req);
    return ApiResp.success(blogTopicVOPageResult);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/nameList")
  public ApiResp<List<ImageCategoryResp>> nameList(@RequestBody @Valid ImageCategoryListReq req) {
    return ApiResp.success(imageCategoryService.nameList(req));
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/add")
  public ApiResp<String> add(@RequestBody @Validated({ImageCategoryReq.GroupImageCategoryAdd.class}) ImageCategoryReq req) {
    return imageCategoryService.add(req);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/edit")
  public ApiResp<String> edit(@RequestBody @Validated({ImageCategoryReq.GroupImageCategoryEdit.class}) ImageCategoryReq req) {
    return imageCategoryService.edit(req);
  }

  @RecordLogger
  @CheckAuth
  @GetMapping("/get")
  public ApiResp<ImageCategoryResp> get(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return imageCategoryService.get(surrogateId);
  }

  @RecordLogger
  @CheckAuth
  @DeleteMapping("/delete")
  public ApiResp<String> delete(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return imageCategoryService.delete(surrogateId);
  }

}
