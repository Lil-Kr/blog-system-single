package com.cy.single.blog.pojo.entity.blog;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2025/4/22
 * @Description:
 */
@EqualsAndHashCode(callSuper = false)
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("blog_content_image")
public class BlogContentImage implements Serializable {

  private static final long serialVersionUID = -1765843272122530575L;

  @JsonSerialize(using = ToStringSerializer.class)
  private Long id;

  @JsonSerialize(using = ToStringSerializer.class)
  private Long blogId;

  private String imageUrl;

  @JsonSerialize(using = ToStringSerializer.class)
  private Long creatorId;

  @JsonSerialize(using = ToStringSerializer.class)
  private Long operator;

  private Date createTime;

  private Date updateTime;
}