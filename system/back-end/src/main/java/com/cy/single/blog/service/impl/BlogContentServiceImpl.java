package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.BlogContentMapper;
import com.cy.single.blog.dao.BlogContentMongoMapper;
import com.cy.single.blog.pojo.dto.blog.BlogContentDTO;
import com.cy.single.blog.pojo.entity.blog.BlogContent;
import com.cy.single.blog.pojo.entity.blog.BlogContentMongo;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.req.blog.content.BlogContentPageReq;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.pojo.resp.blog.BlogCategoryResp;
import com.cy.single.blog.pojo.resp.blog.BlogContentGroupResp;
import com.cy.single.blog.pojo.resp.blog.BlogContentResp;
import com.cy.single.blog.service.BlogContentService;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.service.SysDictDetailService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
@Service
@Slf4j
public class BlogContentServiceImpl implements BlogContentService {

  @Autowired
  private BlogContentMapper blogContentMapper;

  @Autowired
  private BlogContentMongoMapper blogContentMongoMapper;

  @Autowired
  private SysDictDetailService dictDetailService;

  @Autowired
  private CacheService cacheService;

  @Override
  public ApiResp<String> add(BlogContentReq req) {
    BlogContent blogContent = BlogContentDTO.convertSaveBlogContentReq(req);

    // insert into mysql
    int insert = blogContentMapper.insert(blogContent);
    if (insert < 1) {
      return ApiResp.failure(SAVE_ERROR);
    }

    if (StringUtils.isBlank(req.getContentText())) {
      return ApiResp.success("添加博客成功, 但文章内容没有任何值");
    }

    BlogContentMongo blogContentMongo = BlogContentMongo.builder()
      .id(String.valueOf(blogContent.getSurrogateId()))
      .contentText(req.getContentText())
      .build();
    // insert into mongodb
    saveBlogContentMongo(blogContentMongo);
    return ApiResp.success();
  }

  /**
   * 保存博客内容
   *
   * @param entity
   * @return
   */
  @Override
  public BlogContentMongo saveBlogContentMongo(BlogContentMongo entity) {
    return blogContentMongoMapper.save(entity);
  }

  /**
   * 获取博客内容
   *
   * @param surrogateId
   * @return
   */
  private BlogContentMongo getBlogContentMongo(Long surrogateId) {
    return blogContentMongoMapper.findById(String.valueOf(surrogateId)).orElse(null);
  }

  /**
   * 分页查询博客列表
   *
   * @param req
   * @return
   */
  @Override
  public PageResult<BlogContentResp> pageContentList(BlogContentPageReq req) {
    List<BlogContentResp> pageList = blogContentMapper.pageContentList(req);
    Integer count = blogContentMapper.pageContentCount(req);
    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }
    pageList.forEach(item -> {
      // 标签信息
      List<BlogLabel> labelList = Arrays.stream(item.getLabelIds().split(","))
        .map(Long::valueOf)
        .map(cacheService::getLabelCache)
        .collect(Collectors.toList());
      item.setBlogLabelList(labelList);

      // 分类信息
      BlogCategoryResp categoryVO = cacheService.getBlogCategoryCache(item.getCategoryId());
      item.setCategoryName(categoryVO.getName());
      item.setCategoryColor(categoryVO.getColor());

      // 所属专题
      if (Objects.nonNull(item.getTopicId())) {
        BlogTopic topic = cacheService.getTopicCache(item.getTopicId());
        item.setTopicName(topic.getName());
        item.setTopicColor(topic.getColor());
      }

      // 是否原创
      item.setOriginalType(cacheService.getDictDetailCache(item.getOriginal()).getType());

      // 是否推荐
      item.setRecommendType(cacheService.getDictDetailCache(item.getRecommend()).getType());
    });
    return new PageResult<>(pageList, count);
  }

  @Override
  public PageResult<BlogContentResp> contentList(BlogContentPageReq req) {
    List<BlogContentResp> list = blogContentMapper.contentList(req);
    if (CollectionUtils.isEmpty(list)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }

    list.forEach(item -> {
      // 标签信息
      List<BlogLabel> labelList = Arrays.stream(item.getLabelIds().split(","))
        .map(Long::valueOf)
        .map(cacheService::getLabelCache)
        .collect(Collectors.toList());
      item.setBlogLabelList(labelList);

      // 分类信息
      item.setCategoryName(cacheService.getBlogCategoryCache(item.getCategoryId()).getName());
      item.setCategoryColor(cacheService.getBlogCategoryCache(item.getCategoryId()).getColor());

      // 所属专题
      item.setTopicName(cacheService.getTopicCache(item.getTopicId()).getName());
      item.setTopicColor(cacheService.getTopicCache(item.getTopicId()).getColor());

      // 是否原创
      item.setOriginalType(cacheService.getDictDetailCache(item.getOriginal()).getType());

      // 是否推荐
      item.setRecommendType(cacheService.getDictDetailCache(item.getRecommend()).getType());
    });
    return new PageResult<>(list, list.size());
  }

  /**
   * 获取单条博客信息, 包括博客内容
   * @param surrogateId
   * @return
   */
  @Override
  public ApiResp<BlogContentResp> getBlog(Long surrogateId) {
    QueryWrapper<BlogContent> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", surrogateId);
    BlogContent blogContent = blogContentMapper.selectOne(queryWrapper);
    if (Objects.isNull(blogContent)) {
      return ApiResp.failure(INFO_NOT_EXIST);
    }

    // get blog info from mongodb
    BlogContentMongo blogContentMongo = getBlogContentMongo(surrogateId);
    if (Objects.isNull(blogContentMongo) || !String.valueOf(blogContent.getSurrogateId()).equals(blogContentMongo.getId())) {
      return ApiResp.failure(INFO_NOT_EXIST);
    }

    BlogContentResp res = new BlogContentResp();
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
    blogContent.setUpdateTime(DateUtil.localDateTimeNow());
    blogContent.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
    blogContent.setLabelIds(req.getLabelIds().stream().map(String::valueOf).collect(Collectors.joining(",")));

    UpdateWrapper<BlogContent> updateWrapper = new UpdateWrapper<>();
    updateWrapper.eq("surrogate_id", req.getSurrogateId());
    int update = blogContentMapper.update(blogContent, updateWrapper);

    if (update < 1) {
      return ApiResp.failure();
    }

    if (StringUtils.isBlank(req.getContentText())) {
      return ApiResp.success("更新博客成功, 但文章内容没有任何值");
    }

    // update mongodb
    BlogContentMongo updateMongo = BlogContentMongo.builder().id(String.valueOf(req.getSurrogateId())).contentText(req.getContentText()).build();
    saveBlogContentMongo(updateMongo);
    return ApiResp.success();
  }

  /**
   * publish blog
   * @param req
   * @return
   */
  @Override
  public ApiResp<String> publishBlog(BlogContentReq req) {
    BlogContent content = new BlogContent();
    BeanUtils.copyProperties(req, content);
    Date nowDate = DateUtil.localDateTimeNow();
    content.setPublishTime(nowDate);
    content.setUpdateTime(nowDate);
    Integer update = blogContentMapper.updateStatusBySurrogateId(content);
    if (update < 1) {
      return ApiResp.failure();
    }
    return ApiResp.success();
  }

  @Override
  public ApiResp<BlogContentResp> getContent(Long blogId) {
    BlogContentMongo blogContentMongo = getBlogContentMongo(blogId);
    BlogContentResp res = new BlogContentResp();
    res.setSurrogateId(blogId);

    if (Objects.isNull(blogContentMongo)) {
      return ApiResp.success(res);
    }

    res.setContentText(blogContentMongo.getContentText());
    return ApiResp.success(res);
  }

  @Override
  public ApiResp<List<BlogContentResp>> frontContentList() {
    List<BlogContentResp> res = blogContentMapper.frontContentList();
    if (CollectionUtils.isEmpty(res)) {
      return ApiResp.success(new ArrayList<>());
    }
    return ApiResp.success(res);
  }

  @Override
  public List<BlogContentGroupResp> frontContentByGroupCategory() {
    return blogContentMapper.frontContentByGroupCategory();
  }

  @Override
  public PageResult<BlogContentResp> frontContentPageList(BlogContentPageReq req) {
    List<BlogContentResp> pageList = blogContentMapper.frontContentPageList(req);
    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }
    Integer count = blogContentMapper.pageContentCount(req);

    // 设置缓存--作废
//    pageList.stream().forEach(item -> {
//      item.setBlogLabelList(CacheManager.getBlogLabelNameListCache(item.getLabelIds()));
//      item.setBlogCategoryVO(CacheManager.getBlogCategoryAllMapCache().getOrDefault(item.getCategoryId(), new BlogCategoryVO()));
//      item.setBlogTopicVO(CacheManager.getBlogTopicInfoCacheMap().getOrDefault(item.getTopicId(), new BlogTopicVO()));
//    });

    return new PageResult<>(new ArrayList<>(pageList), count);
  }

  @Override
  public ApiResp<String> delete(Long surrogateId) {
    QueryWrapper<BlogContent> query = new QueryWrapper<>();
    query.eq("surrogate_id", surrogateId);
    BlogContent blogContent = blogContentMapper.selectOne(query);
    if (Objects.isNull(blogContent)) {
      return ApiResp.warning(INFO_NOT_EXIST);
    }

    int delete = blogContentMapper.delete(query);
    if (delete < 1) {
      return ApiResp.warning(DEL_ERROR);
    }

    BlogContentMongo blogContentMongo = BlogContentMongo.builder()
      .id(String.valueOf(blogContent.getSurrogateId()))
      .build();
    blogContentMongoMapper.delete(blogContentMongo);
    return ApiResp.success();
  }

}
