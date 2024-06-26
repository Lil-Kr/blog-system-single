package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.cache.CacheManager;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.BlogContentMapper;
import com.cy.single.blog.dao.BlogContentMongoMapper;
import com.cy.single.blog.pojo.dto.blog.BlogContentDTO;
import com.cy.single.blog.pojo.entity.blog.BlogContent;
import com.cy.single.blog.pojo.entity.blog.BlogContentMongo;
import com.cy.single.blog.pojo.req.blog.content.BlogContentPageReq;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;
import com.cy.single.blog.pojo.vo.blog.BlogContentGroupVO;
import com.cy.single.blog.pojo.vo.blog.BlogContentVO;
import com.cy.single.blog.pojo.vo.blog.BlogTopicVO;
import com.cy.single.blog.service.BlogContentService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.cy.single.blog.enums.ReturnCodeEnum.INFO_EXIST;
import static com.cy.single.blog.enums.ReturnCodeEnum.SAVE_ERROR;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
@Service
public class BlogContentServiceImpl implements BlogContentService {

  @Autowired
  private BlogContentMapper blogContentMapper;

  @Autowired
  private BlogContentMongoMapper blogContentMongoMapper;

  @Override
  public ApiResp<String> save(BlogContentReq req) {
    BlogContent blogContent = BlogContentDTO.convertSaveBlogContentReq(req);
    BlogContentMongo blogContentMongo = BlogContentMongo.builder()
      .id(String.valueOf(blogContent.getSurrogateId()))
      .contentText(req.getContentText())
      .build();

    // insert into mysql
    int insert = blogContentMapper.insert(blogContent);

    if (insert > 0) {
      // insert into mongodb
      BlogContentMongo saveMongoResp = saveBlogContentMongo(blogContentMongo);
      return ApiResp.success();
    }else {
      return ApiResp.failure(SAVE_ERROR);
    }
  }

  @Override
  public BlogContentMongo saveBlogContentMongo(BlogContentMongo entity) {
    return blogContentMongoMapper.save(entity);
  }

  private BlogContentMongo getBlogContentMongo(Long surrogateId) {
    return blogContentMongoMapper.findById(String.valueOf(surrogateId)).orElse(null);
  }

  /**
   * 分页查询
   * @param req
   * @return
   */
  @Override
  public PageResult<BlogContentVO> pageContentList(BlogContentPageReq req) {
    List<BlogContentVO> pageList = blogContentMapper.pageContentList(req);
    Integer count = blogContentMapper.contentCount(req);
    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }

    pageList.stream().forEach(item -> {
      item.setBlogLabelList(CacheManager.getBlogLabelListCache(item.getLabelIds()));
      item.setBlogCategoryVO(CacheManager.getBlogCategoryAllMapCache().getOrDefault(item.getCategoryId(), new BlogCategoryVO()));
      item.setBlogTopicVO(CacheManager.getBlogTopicInfoCacheMap().getOrDefault(item.getTopicId(), new BlogTopicVO()));
    });

    return new PageResult<>(pageList, count);
  }

  @Override
  public PageResult<BlogContentVO> contentList(BlogContentPageReq req) {
    List<BlogContentVO> list = blogContentMapper.contentList(req);
    if (CollectionUtils.isEmpty(list)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }

    list.stream().forEach(item -> {
      item.setBlogLabelList(CacheManager.getBlogLabelListCache(item.getLabelIds()));
      item.setBlogCategoryVO(CacheManager.getBlogCategoryAllMapCache().getOrDefault(item.getCategoryId(), new BlogCategoryVO()));
    });

    return new PageResult<>(list, list.size());
  }

  @Override
  public ApiResp<BlogContentVO> get(Long surrogateId) {
    QueryWrapper<BlogContent> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", surrogateId);
    BlogContent blogContent = blogContentMapper.selectOne(queryWrapper);
    if (Objects.isNull(blogContent)) {
      return ApiResp.failure(INFO_EXIST);
    }

    // get blog info from mongodb
    BlogContentMongo blogContentMongo = getBlogContentMongo(surrogateId);
    if (Objects.isNull(blogContentMongo) || !String.valueOf(blogContent.getSurrogateId()).equals(blogContentMongo.getId())) {
      return ApiResp.failure(INFO_EXIST);
    }

    BlogContentVO res = new BlogContentVO();
    BeanUtils.copyProperties(blogContent, res);
    res.setContentText(blogContentMongo.getContentText());

    return ApiResp.success(res);
  }

  @Override
  public ApiResp<String> edit(BlogContentReq req) {
    QueryWrapper<BlogContent> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", req.getSurrogateId());
    BlogContent blogContent = blogContentMapper.selectOne(queryWrapper);
    if (Objects.isNull(blogContent)) {
      return ApiResp.failure();
    }

    BeanUtils.copyProperties(req, blogContent);
    blogContent.setUpdateTime(DateUtil.localDateTimeToDate(LocalDateTime.now()));
    blogContent.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());
    blogContent.setLabelIds(req.getLabelIds().stream().collect(Collectors.joining(",")));

    UpdateWrapper<BlogContent> updateWrapper = new UpdateWrapper<>();
    updateWrapper.eq("surrogate_id", req.getSurrogateId());
    int update = blogContentMapper.update(blogContent, updateWrapper);

    if (update > 0) {
      // update mongodb
      BlogContentMongo updateMongo = BlogContentMongo.builder().id(String.valueOf(req.getSurrogateId())).contentText(req.getContentText()).build();
      BlogContentMongo blogContentMongo = saveBlogContentMongo(updateMongo);
      return ApiResp.success();
    }else {
      return ApiResp.failure();
    }
  }

  /**
   * publish blog
   * @param req
   * @return
   */
  @Override
  public ApiResp<String> publishBlog(BlogContentReq req) {
    Integer update = blogContentMapper.updateStatusBySurrogateId(req);
    if (update > 0) {
      return ApiResp.success();
    }else {
      return ApiResp.failure();
    }
  }

  @Override
  public ApiResp<BlogContentVO> getContent(Long blogId) {
    BlogContentMongo blogContentMongo = getBlogContentMongo(blogId);
    if (Objects.isNull(blogContentMongo)) {
      return ApiResp.failure(INFO_EXIST);
    }

    BlogContentVO res = new BlogContentVO();
    res.setSurrogateId(blogId);
    res.setContentText(blogContentMongo.getContentText());
    return ApiResp.success(res);
  }

  @Override
  public ApiResp<List<BlogContentVO>> frontContentList() {
    List<BlogContentVO> res = blogContentMapper.frontContentList();
    if (CollectionUtils.isEmpty(res)) {
      return ApiResp.success(new ArrayList<>());
    }
    return ApiResp.success(res);
  }

  @Override
  public List<BlogContentGroupVO> frontContentByGroupCategory() {
    return blogContentMapper.frontContentByGroupCategory();
  }

  @Override
  public PageResult<BlogContentVO> frontContentPageList(BlogContentPageReq req) {
    List<BlogContentVO> pageList = blogContentMapper.frontContentPageList(req);
    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }
    Integer count = blogContentMapper.contentCount(req);

    pageList.stream().forEach(item -> {
      item.setBlogLabelList(CacheManager.getBlogLabelNameListCache(item.getLabelIds()));
      item.setBlogCategoryVO(CacheManager.getBlogCategoryAllMapCache().getOrDefault(item.getCategoryId(), new BlogCategoryVO()));
      item.setBlogTopicVO(CacheManager.getBlogTopicInfoCacheMap().getOrDefault(item.getTopicId(), new BlogTopicVO()));
    });

    return new PageResult<>(new ArrayList<>(pageList), count);
  }

}
