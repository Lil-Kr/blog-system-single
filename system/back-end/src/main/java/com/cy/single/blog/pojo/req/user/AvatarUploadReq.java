package com.cy.single.blog.pojo.req.user;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2025/4/20
 * @Description:
 */
@ToString
@Data
public class AvatarUploadReq {

  @NotNull(message = "头像图片不能为空")
  private MultipartFile avatarFile;

  private Long userId;

  private String avatar;
}
