package com.cy.single.blog.pojo.resp.blog;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2025/4/29
 * @Description: post page and next page
 */
@ToString
@Data
public class PrevAndNext {

  @JsonSerialize(using = ToStringSerializer.class)
  private Long surrogateId;

  private String title;

}