package com.cy.single.blog.pojo.vo.image;

import com.cy.single.blog.pojo.entity.image.ImageInfo;
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
public class ImageInfoVO extends ImageInfo implements Serializable {
  private static final long serialVersionUID = 5506127010451586144L;

  private String imageCategoryName;
}
