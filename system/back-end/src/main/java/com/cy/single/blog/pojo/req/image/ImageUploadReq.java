package com.cy.single.blog.pojo.req.image;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Author: Lil-K
 * @Date: 2024/5/31
 * @Description:
 */
@Data
@ToString
public class ImageUploadReq {

//  @NotNull(message = "图片不能为空")
  private MultipartFile image;

//  @NotNull(message = "图片分类id不能为空")
  private Long imageCategoryId;
}
