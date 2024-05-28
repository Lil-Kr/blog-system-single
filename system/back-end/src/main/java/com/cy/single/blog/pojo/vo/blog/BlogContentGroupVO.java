package com.cy.single.blog.pojo.vo.blog;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/5/28
 * @Description:
 */
@ToString
@Data
public class BlogContentGroupVO {

  @JsonSerialize(using = ToStringSerializer.class)
  private Long categoryId;

  private String categoryName;

  private Integer categoryCount;

}
