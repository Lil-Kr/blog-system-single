package com.cy.single.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Author: Lil-K
 * @Date: 2024/4/24
 * @Description:
 */
@Component
public class WebMvcConfig implements WebMvcConfigurer {

  @Value("${upload.rootDir}")
  private String rootDir;

  @Value("${upload.uploadDir}")
  private String uploadDir;

  @Value("${upload.requestMappingPath}")
  private String requestMappingPath;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
      .addResourceHandler(requestMappingPath)
      .addResourceLocations("file:" + rootDir + uploadDir + "/");
  }
}
