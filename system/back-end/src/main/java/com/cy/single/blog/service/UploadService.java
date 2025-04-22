package com.cy.single.blog.service;

import com.cy.single.blog.pojo.req.image.ImageUploadReq;
import com.cy.single.blog.pojo.req.sys.user.AvatarUploadReq;

import java.io.IOException;

/**
 * @Author: Lil-K
 * @Date: 2025/4/20
 * @Description: upload file service
 */
public interface UploadService {

  boolean uploadImage(String fullPath, ImageUploadReq req) throws IOException;

  boolean uploadAvatar(String fullPath, AvatarUploadReq req) throws IOException;
}
