package com.cy.single.blog.pojo.vo.blog;

import com.cy.single.blog.pojo.entity.blog.BlogContent;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
@ToString
@Data
public class BlogContentVO extends BlogContent implements Serializable {
  private String contentText;
}
