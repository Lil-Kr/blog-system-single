package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.image.ImageCategoryPageReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryReq;
import com.cy.single.blog.pojo.vo.image.ImageCategoryVO;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
public interface ImageCategoryService {

  PageResult<ImageCategoryVO> pageList(ImageCategoryPageReq req);

  ApiResp<String> save(ImageCategoryReq req);

  ApiResp<String> edit(ImageCategoryReq req);

  PageResult<ImageCategoryVO> list(ImageCategoryPageReq req);

  ApiResp<ImageCategoryVO> get(Long surrogateId);

  ApiResp<String> delete(Long surrogateId);
}
