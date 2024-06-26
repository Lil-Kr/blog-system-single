package com.cy.single.blog.pojo.dto.image;

import com.cy.single.blog.common.cache.CacheManager;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.image.ImageCategory;
import com.cy.single.blog.pojo.entity.image.ImageInfo;
import com.cy.single.blog.pojo.req.image.ImageCategoryReq;
import com.cy.single.blog.pojo.req.image.ImageInfoReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
public class ImageDTO {


  public static ImageCategory convertSaveImageCategory(ImageCategoryReq imageCategoryReq) {
    ImageCategory imageCategory = new ImageCategory();
    BeanUtils.copyProperties(imageCategoryReq, imageCategory);
    imageCategory.setSurrogateId(IdWorker.getSnowFlakeId());

    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    imageCategory.setDeleted(0);
    imageCategory.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
    imageCategory.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());
    imageCategory.setCreateTime(nowDateTime);
    imageCategory.setUpdateTime(nowDateTime);
    return imageCategory;
  }

  public static ImageInfo convertSaveImageInfo(ImageInfoReq imageInfoReq) {
    ImageInfo imageInfo = new ImageInfo();
    BeanUtils.copyProperties(imageInfoReq, imageInfo);
    imageInfo.setSurrogateId(IdWorker.getSnowFlakeId());

    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    imageInfo.setDeleted(0);
    imageInfo.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
    imageInfo.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());
    imageInfo.setCreateTime(nowDateTime);
    imageInfo.setUpdateTime(nowDateTime);
    return imageInfo;
  }

  public static ImageInfoVO convertImageInfoVO(ImageInfo imageInfo) {
    String imageCategoryName = CacheManager.getImageCategoryCacheMap().getOrDefault(imageInfo.getImageCategoryId(), "");

    ImageInfoVO imageInfoVO = new ImageInfoVO();
    BeanUtils.copyProperties(imageInfo, imageInfoVO);
    imageInfoVO.setImageCategoryName(imageCategoryName);
    return imageInfoVO;
  }

  public static ImageInfo buildImageInfo(Long imageCategoryId, String imageReName, String imageTypeSuffix, String imageOriginalFullName,
                                       String imageUrl) {
    ImageInfo imageInfo = new ImageInfo();
    imageInfo.setSurrogateId(IdWorker.getSnowFlakeId());
    imageInfo.setImageCategoryId(imageCategoryId);
    imageInfo.setName(imageReName);
    imageInfo.setImageType(imageTypeSuffix);
    imageInfo.setImageOriginalName(imageOriginalFullName);
    imageInfo.setImageUrl(imageUrl);
    imageInfo.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
    imageInfo.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());
    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    imageInfo.setCreateTime(nowDateTime);
    imageInfo.setUpdateTime(nowDateTime);

    return imageInfo;
  }
}
