package com.cy.single.blog.pojo.req.image;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
@ToString
@Data
public class ImageCategoryPageReq extends BasePageReq {

  private Integer number;

  private String name;

  private String remark;
}
