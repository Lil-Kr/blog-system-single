package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.BlogCategoryMapper;
import com.cy.single.blog.pojo.dto.blog.BlogCategoryDTO;
import com.cy.single.blog.pojo.entity.blog.BlogCategory;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryReq;
import com.cy.single.blog.pojo.resp.blog.BlogCategoryResp;
import com.cy.single.blog.service.BlogCategoryService;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static com.cy.single.blog.common.constants.CommonConstants.*;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description:
 */
@Slf4j
@Service
public class BlogCategoryServiceImpl implements BlogCategoryService {

  @Autowired
  private BlogCategoryMapper blogCategoryMapper;

  @Autowired
  private CacheService cacheService;

  @Override
  public PageResult<BlogCategoryResp> pageList(BlogCategoryPageReq req) {
    List<BlogCategoryResp> pageList = blogCategoryMapper.pageCategoryList(req);
    Integer count = blogCategoryMapper.getCountByList(req);
    if (CollectionUtils.isEmpty(pageList)) {
        return new PageResult<>(new ArrayList<>(0), 0);
    }else {
        return new PageResult<>(pageList, count);
    }
  }

  @Override
  public PageResult<BlogCategoryResp> list(BlogCategoryPageReq req) {
    List<BlogCategoryResp> blogCategoryList = cacheService.getBlogCategoryListCache(CACHE_KEY_BLOG_CATEGORY_LIST);
    if (CollectionUtils.isEmpty(blogCategoryList)) {
      blogCategoryList = blogCategoryMapper.categoryList(req);
      cacheService.saveBlogCategoryCache(blogCategoryList);
    }

    if (CollectionUtils.isEmpty(blogCategoryList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }

    return new PageResult<>(blogCategoryList, blogCategoryList.size());
  }

  @Override
  public ApiResp<String> add(BlogCategoryReq req) {
    BlogCategory blogCategoryRes = blogCategoryMapper.selectByNumber(req.getNumber());
    if (Objects.nonNull(blogCategoryRes)) {
        return ApiResp.failure(DATA_INFO_REPEAT);
    }else {
        blogCategoryRes = BlogCategory.builder().build();
    }

    BlogCategory saveEntity = BlogCategoryDTO.convertSaveCategoryReq(req, blogCategoryRes);
    Integer save = blogCategoryMapper.insert(saveEntity);
    if (save >= 1) {
      // 更新缓存
      BlogCategoryResp blogCategoryResp = new BlogCategoryResp();
      BeanUtils.copyProperties(saveEntity, blogCategoryResp);
      cacheService.updateBlogCategoryCache(CACHE_KEY_BLOG_CATEGORY_LIST, blogCategoryResp, BUS_CREATE);
      return ApiResp.success();
    }else {
        return ApiResp.failure(Add_ERROR);
    }
  }

    @Override
    public ApiResp<String> edit(BlogCategoryReq req) {
      BlogCategory before = blogCategoryMapper.selectBySurrogateId(req.getSurrogateId());
      if (Objects.isNull(before)) {
          return ApiResp.failure(OPERATE_ERROR);
      }

      if (!before.getNumber().equalsIgnoreCase(req.getNumber())) {
          return ApiResp.failure(OPERATE_ERROR);
      }

      BeanUtils.copyProperties(req, before);
      Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
      before.setStatus(0); // default 0, it not use now
      before.setUpdateTime(nowDateTime);
      before.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
      Integer count = blogCategoryMapper.editBySurrogateId(before);
      if (count >= 1) {
        // 更新缓存
        BlogCategoryResp blogCategoryResp = new BlogCategoryResp();
        BeanUtils.copyProperties(before, blogCategoryResp);
        cacheService.updateBlogCategoryCache(CACHE_KEY_BLOG_CATEGORY_LIST, blogCategoryResp, BUS_EDIT);
        return ApiResp.success();
      }else {
        return ApiResp.failure(Add_ERROR);
      }
    }

    @Override
    public ApiResp<String> delete(Long surrogateId) {
      int count = blogCategoryMapper.deleteBySurrogateId(surrogateId);
      if (count >= 1) {
        // 更新缓存
        BlogCategoryResp blogCategoryResp = new BlogCategoryResp();
        blogCategoryResp.setSurrogateId(surrogateId);
        cacheService.updateBlogCategoryCache(CACHE_KEY_BLOG_CATEGORY_LIST, blogCategoryResp, BUS_DELETE);
        return ApiResp.success("删除成功");
      }else {
        return ApiResp.failure(OPERATE_ERROR);
      }
    }

  @Override
  public ApiResp<String> deleteBatch(BlogCategoryReq req) {
    Integer count = blogCategoryMapper.deleteBatch(req.getSurrogateIds());
    if (count >= 1) {
      return ApiResp.success();
    }else {
      return ApiResp.failure(DEL_ERROR);
    }
  }

  @Override
  public List<BlogCategoryResp> frontList() {
    List<BlogCategoryResp> res = blogCategoryMapper.frontList();

    return res;
  }
}
