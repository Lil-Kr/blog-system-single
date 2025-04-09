package com.cy.single.blog.pojo.entity.image;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * @author
 *
 */
@EqualsAndHashCode(callSuper = false)
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("image_category")
public class ImageCategory implements Serializable {

  private static final long serialVersionUID = 8790752325866544648L;
  /**
   * 唯一键
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long surrogateId;

  /**
   * image全名称
   */
  private String name;

  /**
   * 标题图url
   */
  private String imageUrl;

  private String remark;

  private Integer status;

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