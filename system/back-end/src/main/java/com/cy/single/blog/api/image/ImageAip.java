package com.cy.single.blog.api.image;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.pojo.vo.image.ImageUploadVO;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
 * @Date: 2024/4/24
 * @Description:
 */
@Slf4j
@RestController
@RequestMapping("/image")
public class ImageAip {


  @Value("${upload.rootDir}")
  private String rootDir;

  @Value("${upload.uploadDir}")
  private String uploadDir;

  @Value("${upload.moduleImagePath}")
  private String moduleImagePath;

  @RecordLogger
  @CheckAuth
  @PostMapping("/pageList")
  public ApiResp<String> pageList() {
//    PageResult<BlogLabelVO> list = blogLabelService.pageList(req);

    return ApiResp.success();
  }

  /**
   * TODO: 校验图片大小
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
      String imageUrl = uploadDir + moduleImagePath + imageReName;
      System.out.println(imageUrl);
      // todo insert DB

    } catch (Exception e) {
      log.info("upload image error: {}", e.getMessage());
      return ApiResp.failure(e.getMessage());
    }

    return ApiResp.success("upload " + imageFullName + "success");
  }

  @RecordLogger
  @CheckAuth
  @DeleteMapping("/delete")
  public ApiResp<String> delete(@RequestParam("surrogateId") @Valid @NotNull(message = "surrogateId是必须的") Long surrogateId) {

    return ApiResp.success();
  }

}
