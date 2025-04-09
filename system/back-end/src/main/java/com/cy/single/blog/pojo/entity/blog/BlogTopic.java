package com.cy.single.blog.pojo.entity.blog;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
@EqualsAndHashCode(callSuper = false)
@ToString
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("blog_topic")
public class BlogTopic implements Serializable {

  private static final long serialVersionUID = 1667561250559378031L;

  @TableId(value = "id", type = IdType.AUTO)
  private Long id;

  /**
   * 唯一键
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long surrogateId;

  /**
   * 编号
   */
  private String number;

  /**
   * 专题名
   */
  private String name;

  private Integer status;

  private String color;

  private String remark;

  /**
   * 默认 0
   */
  private Integer deleted = 0;

  /**
   * 创建人
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long creatorId;

  /**
   * 修改人
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long operator;

  /**
   * 创建时间
   */
  private Date createTime;

  /**
   * 更改时间
   */
  private Date updateTime;
}
