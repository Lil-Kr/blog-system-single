package com.cy.single.blog.pojo.resp.image;

import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.image.ImageCategory;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
@ToString
@Data
public class ImageCategoryResp extends ImageCategory implements Serializable {
  private static final long serialVersionUID = -3041539406496075737L;

  private PageResult<ImageInfoResp> imageInfo;
}
