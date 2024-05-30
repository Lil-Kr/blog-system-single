package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.image.ImageInfoPageReq;
import com.cy.single.blog.pojo.req.image.ImageInfoReq;
import com.cy.single.blog.pojo.vo.image.ImageInfoVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
public interface ImageInfoService {

  PageResult<ImageInfoVO> pageImageInfoList(ImageInfoPageReq req);

  PageResult<ImageInfoVO> imageInfoList(ImageInfoPageReq req);

  ApiResp<String> save(ImageInfoReq req);

  ApiResp<ImageInfoVO> get(Long surrogateId);

  Long countByImageCategoryId(Long imageCategoryId);

  ApiResp<String> delete(Long surrogateId);

  ApiResp<String> imageUpload(MultipartFile imageFile) throws IOException;
}
