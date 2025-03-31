package com.cy.single.blog.api.image;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.image.ImageInfoPageListReq;
import com.cy.single.blog.pojo.req.image.ImageInfoReq;
import com.cy.single.blog.pojo.req.image.ImageUploadReq;
import com.cy.single.blog.pojo.resp.image.ImageInfoResp;
import com.cy.single.blog.pojo.resp.image.ImageUploadResp;
import com.cy.single.blog.service.ImageInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description: 图片相关
 */

@Slf4j
@RestController
@RequestMapping("/image/info")
public class ImageInfoController {

  @Autowired
  private ImageInfoService imageInfoService;

  @RecordLogger
  @CheckAuth
  @PostMapping("/pageList")
  public ApiResp<PageResult<ImageInfoResp>> pageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) ImageInfoPageListReq req) {
    PageResult<ImageInfoResp> imageInfoVOPageResult = imageInfoService.pageImageInfoList(req);
    return ApiResp.success(imageInfoVOPageResult);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/list")
  public ApiResp<PageResult<ImageInfoResp>> list(@RequestBody @Validated ImageInfoPageListReq req) {
    PageResult<ImageInfoResp> imageInfoVOPageResult = imageInfoService.imageInfoList(req);
    return ApiResp.success(imageInfoVOPageResult);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/add")
  public ApiResp<String> add(@RequestBody @Validated({ImageInfoReq.GroupImageInfoAdd.class}) ImageInfoReq req) {
    return imageInfoService.add(req);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/edit")
  public ApiResp<String> edit(@RequestBody @Validated(ImageInfoReq.GroupImageInfoEdit.class) ImageInfoReq req) {
    return imageInfoService.edit(req);
  }

  @RecordLogger
  @CheckAuth
  @GetMapping("/get/{surrogateId}")
  public ApiResp<ImageInfoResp> get(@PathVariable("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return imageInfoService.get(surrogateId);
  }

  @RecordLogger
  @CheckAuth
  @DeleteMapping("/delete/{imageId}")
  public ApiResp<String> delete(@PathVariable("imageId") @Valid @NotNull(message = "imageId是必须的") Long surrogateId) {
    return imageInfoService.delete(surrogateId);
  }

  /**
   * TODO: check image size(2M)
   * @param
   * @return
   * @throws IOException
   */
  @RecordLogger
  @CheckAuth
  @PostMapping("/upload")
  public ApiResp<ImageUploadResp> upload(@ModelAttribute ImageUploadReq req) throws IOException {
    return imageInfoService.imageUpload(req);
  }

}