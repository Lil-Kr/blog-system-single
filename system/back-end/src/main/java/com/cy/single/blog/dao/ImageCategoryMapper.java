package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.image.ImageCategory;
import com.cy.single.blog.pojo.req.image.ImageCategoryPageReq;
import com.cy.single.blog.pojo.vo.image.ImageCategoryVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ImageCategoryDAO继承基类
 */
@Repository
public interface ImageCategoryMapper extends BaseMapper<ImageCategory> {

  List<ImageCategoryVO> pageList(@Param("param") ImageCategoryPageReq req);

  Integer total(@Param("param") ImageCategoryPageReq req);

  List<ImageCategoryVO> imageCategoryList(@Param("param") ImageCategoryPageReq req);

  ImageCategoryVO get(Long surrogateId);
}