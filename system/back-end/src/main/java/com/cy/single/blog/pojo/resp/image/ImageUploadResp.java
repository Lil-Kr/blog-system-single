package com.cy.single.blog.pojo.resp.image;

import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/4/24
 * @Description:
 */
@ToString
@Data
public class ImageUploadResp {

  private String uid;
  private String name;
  private String status;
  private String url;
  private String message;
}
