package com.cy.single.blog.pojo.vo.blog;

import com.cy.single.blog.pojo.entity.blog.BlogContent;
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

  /**
   * label names, ","号分隔
   */
  private List<String> labelNames;

  /**
   * content text
   */
  private String contentText;

  private Integer count;
}
