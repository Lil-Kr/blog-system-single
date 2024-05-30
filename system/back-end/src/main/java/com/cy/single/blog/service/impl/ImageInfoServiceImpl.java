package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.cache.CacheManager;
import com.cy.single.blog.dao.ImageInfoMapper;
import com.cy.single.blog.pojo.dto.image.ImageDTO;
import com.cy.single.blog.pojo.entity.image.ImageInfo;
import com.cy.single.blog.pojo.req.image.ImageInfoPageReq;
import com.cy.single.blog.pojo.req.image.ImageInfoReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import com.cy.single.blog.service.ImageInfoService;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
@Service
@Slf4j
public class ImageInfoServiceImpl implements ImageInfoService {

  @Value("${upload.rootDir}")
  private String rootDir;

  @Value("${upload.uploadDir}")
  private String uploadDir;

  @Value("${upload.moduleImagePath}")
  private String moduleImagePath;

  @Autowired
  private ImageInfoMapper imageInfoMapper;

  @Override
  public PageResult<ImageInfoVO> pageImageInfoList(ImageInfoPageReq req) {
    List<ImageInfoVO> pageList = imageInfoMapper.pageImageInfoList(req);
    Integer count = imageInfoMapper.pageImageInfoListCount(req);

    pageList.forEach(item -> item.setImageCategoryName(CacheManager.getImageCategoryCacheMap().getOrDefault(item.getImageCategoryId(),"")));

    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }else {
      return new PageResult<>(pageList, count);
    }
  }

  @Override
  public PageResult<ImageInfoVO> imageInfoList(ImageInfoPageReq req) {
    List<ImageInfoVO> list = imageInfoMapper.imageInfoList(req);
    if (CollectionUtils.isEmpty(list)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }else {
      return new PageResult<>(list, list.size());
    }
  }

  @Override
  public ApiResp<String> save(ImageInfoReq req) {
    ImageInfo imageInfo = ImageDTO.convertSaveImageInfo(req);
    int insert = imageInfoMapper.insert(imageInfo);

    if (insert > 0) {
      return ApiResp.success();
    }else {
      return ApiResp.failure(SAVE_ERROR);
    }
  }

  @Override
  public ApiResp<ImageInfoVO> get(Long surrogateId) {
    QueryWrapper<ImageInfo> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", surrogateId);
    ImageInfo imageInfo = imageInfoMapper.selectOne(queryWrapper);
    if (Objects.isNull(imageInfo)) {
      return ApiResp.failure(INFO_EXIST);
    }

    ImageInfoVO imageInfoVO = ImageDTO.convertImageInfoVO(imageInfo);
    return ApiResp.success(imageInfoVO);
  }

  @Override
  public Long countByImageCategoryId(Long imageCategoryId) {
    QueryWrapper<ImageInfo> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("image_category_id", imageCategoryId);
    return imageInfoMapper.selectCount(queryWrapper);
  }

  @Override
  public ApiResp<String> delete(Long surrogateId) {
    QueryWrapper<ImageInfo> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", surrogateId);
    int delete = imageInfoMapper.delete(queryWrapper);
    if (delete >= 1) {
      return ApiResp.success();
    } else {
      return ApiResp.failure(DEL_ERROR);
    }
  }

  @Override
  public ApiResp<String> imageUpload(MultipartFile imageFile) throws IOException {
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
      ImageInfo imageInfo = new ImageInfo();
      imageInfo.setSurrogateId(IdWorker.getSnowFlakeId());
//      imageInfo.setImageCategoryId();


    } catch (Exception e) {
      log.info("upload image error: {}", e.getMessage());
      return ApiResp.failure(e.getMessage());
    }
    return ApiResp.success("upload " + imageFullName + " success");
  }

}
