package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.image.ImageInfo;
import com.cy.single.blog.pojo.req.image.ImageInfoPageListReq;
import com.cy.single.blog.pojo.resp.image.ImageInfoResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ImageInfoMapper继承基类
 */
@Repository
public interface ImageInfoMapper extends BaseMapper<ImageInfo> {

  List<ImageInfoResp> pageImageInfoList(@Param("param") ImageInfoPageListReq req);

  Integer pageImageInfoListCount(@Param("param") ImageInfoPageListReq req);

  List<ImageInfoResp> imageInfoList(@Param("param") ImageInfoPageListReq req);

  List<ImageInfoResp> pageImageInfoListByCategoryId(Long surrogateId);

  Integer pageImageInfoListByCategoryIdCount(Long surrogateId);
}