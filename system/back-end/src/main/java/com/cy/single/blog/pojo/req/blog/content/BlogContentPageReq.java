package com.cy.single.blog.pojo.req.blog.content;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/5/26
 * @Description:
 */
@ToString
@Data
public class BlogContentPageReq extends BasePageReq {

  private Long surrogateId;

  private Integer number;

  private String name;

  private String title;

  private Integer original;

  private Integer recommend;

  private Integer status;

  private String remark;
}
