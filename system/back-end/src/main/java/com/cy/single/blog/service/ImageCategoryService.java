package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.image.ImageCategoryListReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryPageListReq;
import com.cy.single.blog.pojo.req.image.ImageCategoryReq;
import com.cy.single.blog.pojo.resp.image.ImageCategoryResp;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
public interface ImageCategoryService {

  PageResult<ImageCategoryResp> pageList(ImageCategoryPageListReq req);

  ApiResp<String> add(ImageCategoryReq req);

  ApiResp<String> edit(ImageCategoryReq req);

  PageResult<ImageCategoryResp> list(ImageCategoryListReq req);

  ApiResp<ImageCategoryResp> get(Long surrogateId);

  ApiResp<String> delete(Long surrogateId);

  List<ImageCategoryResp> nameList(ImageCategoryListReq req);
}
