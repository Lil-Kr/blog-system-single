package com.cy.single.blog.service;

/**
 * @Author: Lil-K
 * @Date: 2024/5/27
 * @Description:
 */
public interface StartupInitializerService {

  void initBlogLabel();

  void initBlogTopic();

  void initBlogCategory();

  void initImageCategory();
}
