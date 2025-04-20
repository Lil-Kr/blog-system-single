package com.cy.single.blog.service.impl;

import com.cy.single.blog.pojo.req.image.ImageUploadReq;
import com.cy.single.blog.pojo.req.user.AvatarUploadReq;
import com.cy.single.blog.service.UploadService;

import java.io.IOException;

/**
 * @Author: Lil-K
 * @Date: 2025/4/20
 * @Description:
 */
public class UploadServiceImpl implements UploadService {

  @Override
  public boolean uploadImage(String fullPath, ImageUploadReq req) throws IOException {
    return false;
  }

  @Override
  public boolean uploadAvatar(String fullPath, AvatarUploadReq req) throws IOException {
    return false;
  }
}
