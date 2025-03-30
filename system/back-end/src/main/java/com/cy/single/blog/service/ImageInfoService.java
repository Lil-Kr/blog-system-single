package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.image.ImageInfoPageListReq;
import com.cy.single.blog.pojo.req.image.ImageInfoReq;
import com.cy.single.blog.pojo.req.image.ImageUploadReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import com.cy.single.blog.pojo.vo.image.ImageUploadVO;

import java.io.IOException;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
public interface ImageInfoService {

  PageResult<ImageInfoVO> pageImageInfoList(ImageInfoPageListReq req);

  PageResult<ImageInfoVO> imageInfoList(ImageInfoPageListReq req);

  ApiResp<String> add(ImageInfoReq req);

  ApiResp<ImageInfoVO> get(Long surrogateId);

  Long countByImageCategoryId(Long surrogateId);

  ApiResp<String> delete(Long surrogateId);

  ApiResp<ImageUploadVO> imageUpload(ImageUploadReq req) throws IOException;

  ApiResp<String> edit(ImageInfoReq req);
}
