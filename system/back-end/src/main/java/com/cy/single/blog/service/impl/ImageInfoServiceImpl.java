package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.dao.ImageInfoMapper;
import com.cy.single.blog.pojo.dto.image.ImageDTO;
import com.cy.single.blog.pojo.entity.image.ImageInfo;
import com.cy.single.blog.pojo.req.image.ImageInfoPageReq;
import com.cy.single.blog.pojo.req.image.ImageInfoReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import com.cy.single.blog.service.ImageInfoService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
public class ImageInfoServiceImpl implements ImageInfoService {

  @Autowired
  private ImageInfoMapper imageInfoMapper;

  @Override
  public PageResult<ImageInfoVO> pageImageInfoList(ImageInfoPageReq req) {
    List<ImageInfoVO> pageList = imageInfoMapper.pageImageInfoList(req);
    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }else {
      return new PageResult<>(pageList, pageList.size());
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
    ImageInfoVO imageInfoVO = imageInfoMapper.get(surrogateId);
    if (Objects.isNull(imageInfoVO)) {
      return ApiResp.failure(INFO_EXIST);
    }
    ImageDTO.convertImageInfoVO(imageInfoVO);
    return ApiResp.success(imageInfoVO);
//    ImageInfoVO imageInfoVO = new ImageInfoVO();
//    imageInfoVO.setName("这是测试" + DateUtil.localDateTimeToDate(LocalDateTime.now()));
//    imageInfoVO.setRemark("abc");
//    return ApiResp.success(imageInfoVO);
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

}
