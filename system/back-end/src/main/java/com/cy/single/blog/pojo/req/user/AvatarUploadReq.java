package com.cy.single.blog.pojo.req.user;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Author: Lil-K
 * @Date: 2025/4/20
 * @Description:
 */
@ToString
@Data
public class AvatarUploadReq {

  private MultipartFile avatarFile;

  private Long userId;

  private String avatar;
}
