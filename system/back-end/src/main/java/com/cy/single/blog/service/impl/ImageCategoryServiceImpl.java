package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.ImageCategoryMapper;
import com.cy.single.blog.pojo.dto.image.ImageDTO;
import com.cy.single.blog.pojo.entity.image.ImageCategory;
import com.cy.single.blog.pojo.req.image.ImageCategoryListReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryPageListReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryReq;
import com.cy.single.blog.pojo.req.image.ImageInfoPageListReq;
import com.cy.single.blog.pojo.resp.image.ImageCategoryResp;
import com.cy.single.blog.pojo.resp.image.ImageInfoResp;
import com.cy.single.blog.service.ImageCategoryService;
import com.cy.single.blog.service.ImageInfoService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class ImageCategoryServiceImpl implements ImageCategoryService {

  @Autowired
  private ImageCategoryMapper imageCategoryMapper;

  @Autowired
  private ImageInfoService imageInfoService;

  @Override
  public PageResult<ImageCategoryResp> pageList(ImageCategoryPageListReq req) {
    List<ImageCategoryResp> list = imageCategoryMapper.pageList(req);
    Integer total = imageCategoryMapper.total(req);
    if (CollectionUtils.isEmpty(list)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    } else {
      return new PageResult<>(list, total);
    }
  }

  @Override
  public PageResult<ImageCategoryResp> list(ImageCategoryListReq req) {
    List<ImageCategoryResp> list = imageCategoryMapper.imageCategoryList(req);
    if (CollectionUtils.isEmpty(list)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }

    return new PageResult<>(list, list.size());
  }

  @Override
  public ApiResp<ImageCategoryResp> get(Long surrogateId) {
    ImageCategoryResp imageCategoryResp = imageCategoryMapper.get(surrogateId);
    if (Objects.isNull(imageCategoryResp)) {
      return ApiResp.failure();
    }

    ImageInfoPageListReq req = new ImageInfoPageListReq();
    req.setImageCategoryId(imageCategoryResp.getSurrogateId());
    PageResult<ImageInfoResp> imageInfoVOPageResult = imageInfoService.imageInfoList(req);

    imageCategoryResp.setImageInfo(imageInfoVOPageResult);

    return ApiResp.success(imageCategoryResp);
  }

  @Override
  public ApiResp<String> add(ImageCategoryReq req) {
    QueryWrapper<ImageCategory> wrapper = new QueryWrapper<>();
    wrapper.eq("name", req.getName());
    ImageCategory before = imageCategoryMapper.selectOne(wrapper);
    if (Objects.nonNull(before)) {
      return ApiResp.warning(ADD_ERROR);
    }

    ImageCategory imageCategory = ImageDTO.convertSaveImageCategory(req);
    int insert = imageCategoryMapper.insert(imageCategory);
    if (insert < 1) {
      return ApiResp.failure(ADD_ERROR);
    }

    return ApiResp.success();
  }

  @Override
  public ApiResp<String> edit(ImageCategoryReq req) {
    // 检查数据是否合法
    QueryWrapper<ImageCategory> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", req.getSurrogateId());
    queryWrapper.eq("name", req.getName());
    ImageCategory before = imageCategoryMapper.selectOne(queryWrapper);
    if (Objects.isNull(before)) {
      return ApiResp.failure(OPERATE_ERROR);
    }

    BeanUtils.copyProperties(req, before);
    before.setUpdateTime(DateUtil.localDateTimeNow());
    before.setOperator(RequestHolder.getCurrentUser().getSurrogateId());

    UpdateWrapper<ImageCategory> updateWrapper = new UpdateWrapper<>();
    updateWrapper.eq("surrogate_id", before.getSurrogateId());
    int update = imageCategoryMapper.update(before, updateWrapper);

    if (update < 1) {
      return ApiResp.failure(ADD_ERROR);
    }
    return ApiResp.success();
  }

  @Transactional
  @Override
  public ApiResp<String> delete(Long surrogateId) {
    imageInfoService.countByImageCategoryId(surrogateId);
    QueryWrapper<ImageCategory> wrapper = new QueryWrapper<>();
    wrapper.eq("surrogate_id", surrogateId);
    int delete = imageCategoryMapper.delete(wrapper);

    if (delete < 1) {
      return ApiResp.failure(DEL_ERROR);
    }

    return ApiResp.success();
  }

  @Override
  public List<ImageCategoryResp> nameList(ImageCategoryListReq req) {
    return imageCategoryMapper.imageCategoryNameList(req);
  }

}
