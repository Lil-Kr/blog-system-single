package com.cy.single.blog.api.image;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.image.ImageInfoPageReq;
import com.cy.single.blog.pojo.req.image.ImageInfoReq;
import com.cy.single.blog.pojo.req.image.ImageUploadReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import com.cy.single.blog.pojo.vo.image.ImageUploadVO;
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
 * @Description:
 */

@Slf4j
@RestController
@RequestMapping("/image/info")
public class ImageInfoApi {

  @Autowired
  private ImageInfoService imageInfoService;

  @RecordLogger
  @CheckAuth
  @PostMapping("/pageList")
  public ApiResp<PageResult<ImageInfoVO>> pageList(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) ImageInfoPageReq req) {
    PageResult<ImageInfoVO> imageInfoVOPageResult = imageInfoService.pageImageInfoList(req);
    return ApiResp.success(imageInfoVOPageResult);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/list")
  public ApiResp<PageResult<ImageInfoVO>> list(@RequestBody @Validated ImageInfoPageReq req) {
    PageResult<ImageInfoVO> imageInfoVOPageResult = imageInfoService.imageInfoList(req);
    return ApiResp.success(imageInfoVOPageResult);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/save")
  public ApiResp<String> list(@RequestBody @Validated({ImageInfoReq.GroupImageInfoSave.class}) ImageInfoReq req) {
    return imageInfoService.save(req);
  }

  @RecordLogger
  @CheckAuth
  @PostMapping("/edit")
  public ApiResp<String> edit(@RequestBody @Validated(ImageInfoReq.GroupImageInfoEdit.class) ImageInfoReq req) {
    return imageInfoService.save(req);
  }

  @RecordLogger
  @CheckAuth
  @GetMapping("/get/{surrogateId}")
  public ApiResp<ImageInfoVO> get(@PathVariable("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
    return imageInfoService.get(surrogateId);
  }

  @RecordLogger
  @CheckAuth
  @DeleteMapping("/delete")
  public ApiResp<String> delete(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
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
  public ApiResp<ImageUploadVO> upload(@ModelAttribute ImageUploadReq req) throws IOException {
    return imageInfoService.imageUpload(req);
  }

}