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
import com.cy.single.blog.pojo.req.image.ImageUploadReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import com.cy.single.blog.pojo.vo.image.ImageUploadVO;
import com.cy.single.blog.service.ImageInfoService;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.luciad.imageio.webp.WebPWriteParam;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.constant.ResponseConstant.IMAGE_SIZE_ERROR;
import static com.cy.single.blog.constant.ResponseConstant.RESPONSE_UPLOAD_IMAGE_ERROR_INFO;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
@Service
@Slf4j
public class ImageInfoServiceImpl implements ImageInfoService {

  private static final String UPLOAD_IMAGE_ERROR = "error";
  private static final String UPLOAD_IMAGE_DONE = "done";

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

    ImageInfo imageInfo = imageInfoMapper.selectOne(queryWrapper);
    if (Objects.isNull(imageInfo)) {
      return ApiResp.failure(DEL_ERROR);
    }

    // delete from DB
    int delete = imageInfoMapper.delete(queryWrapper);
    if (delete >= 1) {
      // delete from Disk
      String filePath = rootDir + imageInfo.getImageUrl();
      Path delPath = Paths.get(filePath);
      try {
        Files.delete(delPath);
        return ApiResp.success();
      } catch (IOException e) {
        log.info("delete image error: {}", e.getMessage());
        return ApiResp.failure(DEL_ERROR);
      }
    } else {
      return ApiResp.failure(DEL_ERROR);
    }
  }

  @Override
  public ApiResp<ImageUploadVO> imageUpload(ImageUploadReq req) throws IOException {
    MultipartFile imageFile = req.getImage();
    // 检查文件大小，限制为 15MB
    long maxSizeInBytes = 10 * 1024 * 1024; // 15MB
    if (imageFile.getSize() > maxSizeInBytes) {
      return ApiResp.failure(IMAGE_SIZE_ERROR);
    }

    String imageOriginalFullName = imageFile.getOriginalFilename();
    String[] imageFileNames = imageOriginalFullName.split("\\.");
    if (imageFileNames.length > 2) {
      return ApiResp.failure(RESPONSE_UPLOAD_IMAGE_ERROR_INFO);
    }

    String imageName = imageFileNames[0];
    String imageTypeSuffix = "webp";

    StringBuffer resourcePath = new StringBuffer(rootDir);
    resourcePath.append(uploadDir);

    // create Path object
    Path rootPath = Paths.get(resourcePath.toString());
    if (!Files.exists(rootPath)) {
      Files.createDirectories(rootPath);
    }

    String imageReName = imageName + "_" + IdWorker.getSnowFlakeId() + "." + imageTypeSuffix;
    resourcePath.append(moduleImagePath + "/" + imageReName);

    ImageUploadVO imageUploadVO = new ImageUploadVO();
    try(InputStream inputStream = imageFile.getInputStream()) {
      /**
       * write image to disk
       */
      BufferedImage originalImage = ImageIO.read(inputStream);
      Iterator<ImageWriter> writers = ImageIO.getImageWritersByMIMEType("image/webp");
      if (!writers.hasNext()) {
        return ApiResp.failure("No writers found for format: webp");
      }

      ImageWriter writer = writers.next();
      // writer webp to disk
      try (ImageOutputStream ios = ImageIO.createImageOutputStream(Files.newOutputStream(Paths.get(resourcePath.toString())))) {
        WebPWriteParam writeParam = new WebPWriteParam(writer.getLocale());
        writeParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        writeParam.setCompressionType(writeParam.getCompressionTypes()[WebPWriteParam.LOSSY_COMPRESSION]); // lossy compression
        writeParam.setCompressionQuality(0.75f);
        writer.setOutput(ios);
        writer.write(null, new IIOImage(originalImage, null, null), writeParam);
      } catch (Exception e) {
        log.info("image format webp error: {}", e.getMessage());
        imageUploadVO.setMessage(e.getMessage());
        imageUploadVO.setStatus(UPLOAD_IMAGE_ERROR);
        return ApiResp.failure(imageUploadVO);
      }

      /**
       * insert into DB
       * splice name, image_url, type ...
       */
      String imageUrl = uploadDir + moduleImagePath + "/" + imageReName;
      ImageInfo imageInfo = ImageDTO.buildImageInfo(req.getImageCategoryId(), imageReName, imageTypeSuffix, imageOriginalFullName, imageUrl);
      int insert = imageInfoMapper.insert(imageInfo);

      imageUploadVO.setName(imageInfo.getName());
      imageUploadVO.setUid(String.valueOf(imageInfo.getSurrogateId()));
      imageUploadVO.setUrl(imageUrl);
      if (insert > 0) {
        imageUploadVO.setStatus(UPLOAD_IMAGE_DONE);
        return ApiResp.success(imageUploadVO);
      }else {
        imageUploadVO.setStatus(UPLOAD_IMAGE_ERROR);
        return ApiResp.failure(imageUploadVO);
      }
    } catch (Exception e) {
      log.info("upload image error: {}", e.getMessage());
      imageUploadVO.setMessage(e.getMessage());
      imageUploadVO.setStatus(UPLOAD_IMAGE_ERROR);
      return ApiResp.failure(imageUploadVO);
    }
  }

}
