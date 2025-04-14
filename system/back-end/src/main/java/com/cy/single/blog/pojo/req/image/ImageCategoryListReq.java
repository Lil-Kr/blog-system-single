package com.cy.single.blog.pojo.req.image;

import com.cy.single.blog.base.BaseReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2025/3/30
 * @Description:
 */
@ToString
@Data
public class ImageCategoryListReq extends BaseReq {

  private static final long serialVersionUID = -3408442223614600984L;

  private String name;

  private String remark;

  private Integer status;
}
