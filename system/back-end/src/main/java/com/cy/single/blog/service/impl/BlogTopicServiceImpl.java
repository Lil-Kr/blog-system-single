package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.BlogTopicMapper;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicPageReq;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicReq;
import com.cy.single.blog.pojo.vo.blog.BlogTopicVO;
import com.cy.single.blog.service.BlogTopicService;
import com.cy.single.blog.service.CacheService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
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
 * @Date: 2024/5/25
 * @Description:
 */
@Service
public class BlogTopicServiceImpl implements BlogTopicService {

  @Autowired
  private BlogTopicMapper blogTopicMapper;

  @Autowired
  private CacheService cacheService;

  @Override
  public PageResult<BlogTopicVO> pageTopicList(BlogTopicPageReq req) {
    List<BlogTopicVO> blogTopicList = blogTopicMapper.pageTopicList(req);
    if (CollectionUtils.isEmpty(blogTopicList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    } else {
      return new PageResult<>(blogTopicList, blogTopicList.size());
    }
  }

  @Override
  public PageResult<BlogTopic> list(BlogTopicReq req) {
    List<BlogTopic> topicList = cacheService.getTopicListCache(CACHE_KEY_BLOG_TOPIC_LIST);
    if (CollectionUtils.isEmpty(topicList)) {
      topicList = blogTopicMapper.topicList(req);
      cacheService.saveBlogTopicCache(topicList);
    }
    if (CollectionUtils.isEmpty(topicList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }
    return new PageResult<>(topicList, topicList.size());
  }

  @Override
  public ApiResp<String> add(BlogTopicReq req) {
    BlogTopic blogTopic =  blogTopicMapper.selectByNumber(req.getNumber());
    if (Objects.nonNull(blogTopic)) {
      return ApiResp.failure(DATA_INFO_REPEAT);
    }else {
      blogTopic = BlogTopic.builder().build();
    }

    BeanUtils.copyProperties(req, blogTopic);
    blogTopic.setSurrogateId(IdWorker.getSnowFlakeId());
    blogTopic.setStatus(0); // default 0, it`s not used now
    blogTopic.setDeleted(0); // default 0, it not used now
    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    blogTopic.setCreateTime(nowDateTime);
    blogTopic.setUpdateTime(nowDateTime);
    blogTopic.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
    blogTopic.setOperator(RequestHolder.getCurrentUser().getSurrogateId());

    int save = blogTopicMapper.insert(blogTopic);
    if (save >= 1) {
      // 更新缓存
      cacheService.updateBlogTopicCache(CACHE_KEY_BLOG_TOPIC_LIST, blogTopic, BUS_CREATE, 0l);
      return ApiResp.success();
    }else {
      return ApiResp.failure(SAVE_ERROR);
    }
  }

  @Override
  public ApiResp<String> edit(BlogTopicReq req) {

    QueryWrapper queryWrapper = new QueryWrapper();
    queryWrapper.eq("surrogate_id", req.getSurrogateId());
    BlogTopic blogTopic = blogTopicMapper.selectOne(queryWrapper);
    if (Objects.isNull(blogTopic)) {
      return ApiResp.failure(OPERATE_ERROR);
    }

    BeanUtils.copyProperties(req, blogTopic);
    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    blogTopic.setUpdateTime(nowDateTime);
    blogTopic.setOperator(RequestHolder.getCurrentUser().getSurrogateId());

    UpdateWrapper<BlogTopic> updateWrapper = new UpdateWrapper<>();
    updateWrapper.eq("surrogate_id", blogTopic.getSurrogateId());
    int update = blogTopicMapper.update(blogTopic, updateWrapper);

    if (update >= 1) {
      // 更新缓存
      cacheService.updateBlogTopicCache(CACHE_KEY_BLOG_TOPIC_LIST, blogTopic, BUS_EDIT, 0l);
      return ApiResp.success();
    } else {
      return ApiResp.failure(SAVE_ERROR);
    }
  }

  @Override
  public ApiResp<String> delete(Long surrogateId) {
    QueryWrapper wrapper = new QueryWrapper();
    wrapper.eq("surrogate_id", surrogateId);
    int delete = blogTopicMapper.delete(wrapper);
    if (delete >= 1) {
      // 更新缓存
      cacheService.updateBlogTopicCache(CACHE_KEY_BLOG_TOPIC_LIST, null, BUS_DELETE, surrogateId);
      return ApiResp.success();
    }else {
      return ApiResp.failure(OPERATE_ERROR);
    }
  }

  @Override
  public ApiResp<String> deleteBatch(BlogTopicReq req) {
    return null;
  }
}
