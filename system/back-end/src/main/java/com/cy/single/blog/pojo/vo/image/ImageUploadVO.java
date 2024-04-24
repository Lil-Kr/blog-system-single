package com.cy.single.blog.pojo.vo.image;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/4/24
 * @Description:
 */
@ToString
@Builder
@Data
public class ImageUploadVO {

  private String uid;
  private String name;
  private String status;
  private String url;
}
