package com.cy.single.blog.service.impl;

import com.cy.single.blog.common.cache.CacheManager;
import com.cy.single.blog.dao.BlogCategoryMapper;
import com.cy.single.blog.dao.BlogLabelMapper;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import com.cy.single.blog.service.StartupInitializerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/5/27
 * @Description:
 */
@Service
@Slf4j
public class StartupInitializerServiceImpl implements StartupInitializerService {

  @Autowired
  private BlogLabelMapper blogLabelMapper;

  @Autowired
  private BlogCategoryMapper blogCategoryMapper;

  @PostConstruct
  @Override
  public void initBlogLabel() {
    List<BlogLabelVO> blogLabels = blogLabelMapper.getLabelList(new BlogLabelListReq());
    CacheManager.setBlogLabelListCache(blogLabels);
  }

  @Override
  public void initBlogTopic() {

  }

  @PostConstruct
  @Override
  public void initBlogCategory() {
    List<BlogCategoryVO> blogCategoryVOS = blogCategoryMapper.categoryList(new BlogCategoryPageReq());
    CacheManager.setBlogCategoryAllListCache(blogCategoryVOS);
  }
}
