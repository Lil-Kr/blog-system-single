package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.image.ImageCategory;
import com.cy.single.blog.pojo.req.image.ImageCategoryListReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryPageListReq;
import com.cy.single.blog.pojo.resp.image.ImageCategoryResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ImageCategoryDAO继承基类
 */
@Repository
public interface ImageCategoryMapper extends BaseMapper<ImageCategory> {

  List<ImageCategoryResp> pageList(@Param("param") ImageCategoryPageListReq req);

  Integer total(@Param("param") ImageCategoryPageListReq req);

  List<ImageCategoryResp> imageCategoryList(@Param("param") ImageCategoryListReq req);

  ImageCategoryResp get(Long surrogateId);
}