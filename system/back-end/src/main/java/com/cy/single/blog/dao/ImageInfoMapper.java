package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.image.ImageInfo;
import com.cy.single.blog.pojo.req.image.ImageInfoPageReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ImageInfoMapper继承基类
 */
@Repository
public interface ImageInfoMapper extends BaseMapper<ImageInfo> {

  List<ImageInfoVO> pageImageInfoList(@Param("param") ImageInfoPageReq req);

  Integer pageImageInfoListCount(@Param("param") ImageInfoPageReq req);

  List<ImageInfoVO> imageInfoList(@Param("param") ImageInfoPageReq req);

  List<ImageInfoVO> pageImageInfoListByCategoryId(Long surrogateId);

  Integer pageImageInfoListByCategoryIdCount(Long surrogateId);
}