package com.cy.single.blog.api.image;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.image.ImageInfoPageReq;
import com.cy.single.blog.pojo.req.image.ImageInfoReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import com.cy.single.blog.pojo.vo.image.ImageUploadVO;
import com.cy.single.blog.service.ImageInfoService;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */

@Slf4j
@RestController
@RequestMapping("/image/info")
public class ImageInfoApi {


  @Value("${upload.rootDir}")
  private String rootDir;

  @Value("${upload.uploadDir}")
  private String uploadDir;

  @Value("${upload.moduleImagePath}")
  private String moduleImagePath;

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
  public ApiResp<PageResult<ImageInfoVO>> list(@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) ImageInfoPageReq req) {
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
  @GetMapping("/get")
  public ApiResp<ImageInfoVO> get(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {
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
   * @param imageFile
   * @return
   * @throws IOException
   */
  @RecordLogger
  @CheckAuth
  @PostMapping("/upload")
  public ApiResp<ImageUploadVO> upload(@RequestParam("avatar") MultipartFile imageFile) throws IOException {
    String imageFullName = imageFile.getOriginalFilename();
    String[] imageFileNames = imageFullName.split("\\.");
    String imageName = imageFileNames[0];
    String imageTypeSuffix = imageFileNames[1];

    StringBuffer resourcePath = new StringBuffer(rootDir);
    resourcePath.append(uploadDir);

    // 创建Path对象
    Path rootPath = Paths.get(resourcePath.toString());
    if (!Files.exists(rootPath)) {
      Files.createDirectories(rootPath);
    }

    String imageReName = imageName + "_" + IdWorker.getSnowFlakeId() + "." + imageTypeSuffix;
    resourcePath.append(moduleImagePath + "/" + imageReName);

    try(InputStream inputStream = imageFile.getInputStream()) {
      Files.copy(inputStream, Paths.get(resourcePath.toString()), StandardCopyOption.REPLACE_EXISTING);
      String imageUrl = uploadDir + moduleImagePath + "/" + imageReName;
      // /upload/imageJay1_20240422212922_1784458980102377472.png
//      System.out.println(imageUrl);

      /**
       * TODO: insert DB
       * splice name, image_url, type ...
       */
    } catch (Exception e) {
      log.info("upload image error: {}", e.getMessage());
      return ApiResp.failure(e.getMessage());
    }
    return ApiResp.success("upload " + imageFullName + " success");
  }

}