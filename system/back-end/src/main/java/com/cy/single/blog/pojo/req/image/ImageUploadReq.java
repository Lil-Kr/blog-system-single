package com.cy.single.blog.pojo.req.image;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Author: Lil-K
 * @Date: 2024/5/31
 * @Description:
 */
@Data
public class ImageUploadReq {
  private MultipartFile image;
  private Long imageCategoryId;
}