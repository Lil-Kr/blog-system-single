package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.ImageCategoryMapper;
import com.cy.single.blog.pojo.dto.image.ImageDTO;
import com.cy.single.blog.pojo.entity.image.ImageCategory;
import com.cy.single.blog.pojo.req.image.ImageCategoryPageReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryReq;
import com.cy.single.blog.pojo.vo.image.ImageCategoryVO;
import com.cy.single.blog.service.ImageCategoryService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
@Service
public class ImageCategoryServiceImpl implements ImageCategoryService {

  @Autowired
  private ImageCategoryMapper imageCategoryMapper;

  @Override
  public PageResult<ImageCategoryVO> pageList(ImageCategoryPageReq req) {
    List<ImageCategoryVO> list = imageCategoryMapper.pageList(req);
    Integer total = imageCategoryMapper.total(req);
    if (CollectionUtils.isEmpty(list)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    } else {
      return new PageResult<>(list, total);
    }
  }

  @Override
  public PageResult<ImageCategoryVO> list(ImageCategoryPageReq req) {
    List<ImageCategoryVO> list = imageCategoryMapper.imageCategoryList(req);
    if (CollectionUtils.isEmpty(list)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }

    return new PageResult<>(list, list.size());
  }

  @Override
  public ApiResp<ImageCategoryVO> get(Long surrogateId) {
    ImageCategoryVO imageCategoryVO1 = imageCategoryMapper.get(surrogateId);
    if (Objects.isNull(imageCategoryVO1)) {
      return ApiResp.failure();
    }
    return ApiResp.success(imageCategoryVO1);
  }

  @Override
  public ApiResp<String> save(ImageCategoryReq req) {
    ImageCategory imageCategory = ImageDTO.convertSaveImageCategory(req);
    int insert = imageCategoryMapper.insert(imageCategory);

    if (insert > 0) {
      return ApiResp.success();
    }else {
      return ApiResp.failure(SAVE_ERROR);
    }
  }

  @Override
  public ApiResp<String> edit(ImageCategoryReq req) {
    QueryWrapper queryWrapper = new QueryWrapper();
    queryWrapper.eq("surrogate_id", req.getSurrogateId());
    ImageCategory imageCategory = imageCategoryMapper.selectOne(queryWrapper);
    if (Objects.isNull(imageCategory)) {
      return ApiResp.failure(OPERATE_ERROR);
    }
    BeanUtils.copyProperties(req, imageCategory);
    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    imageCategory.setUpdateTime(nowDateTime);
    imageCategory.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());

    UpdateWrapper<ImageCategory> updateWrapper = new UpdateWrapper<>();
    updateWrapper.eq("surrogate_id", imageCategory.getSurrogateId());
    int update = imageCategoryMapper.update(imageCategory, updateWrapper);

    if (update >= 1) {
      return ApiResp.success();
    } else {
      return ApiResp.failure(SAVE_ERROR);
    }
  }

  @Override
  public ApiResp<String> delete(Long surrogateId) {
    QueryWrapper queryWrapper = new QueryWrapper();
    queryWrapper.eq("surrogate_id", surrogateId);
    int delete = imageCategoryMapper.delete(queryWrapper);
    if (delete >= 1) {
      return ApiResp.success();
    } else {
      return ApiResp.failure(DEL_ERROR);
    }
  }

}
