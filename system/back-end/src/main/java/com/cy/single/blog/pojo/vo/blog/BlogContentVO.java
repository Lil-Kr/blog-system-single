package com.cy.single.blog.pojo.vo.blog;

import com.cy.single.blog.pojo.entity.blog.BlogContent;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
@ToString
@Data
public class BlogContentVO extends BlogContent implements Serializable {

  private static final long serialVersionUID = -6216586260975821759L;

  /**
   * label
   */
  private List<BlogLabel> blogLabelList;

  private String categoryName;

  private String categoryColor;

  private String topicName;

  private Integer originalType;

  private Integer recommendType;

  private Integer statusType;
}
