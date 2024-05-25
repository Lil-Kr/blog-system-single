package com.cy.single.blog.pojo.req.blog.topic;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/5/25
 * @Description:
 */
@ToString
@Data
public class BlogTopicPageReq extends BasePageReq {

  private Long surrogateId;

  private Integer number;

  private String name;

  private String remark;
}
