package com.cy.single.blog.pojo.entity.image;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2025/3/30
 * @Description:
 */
@EqualsAndHashCode(callSuper = false)
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("image_info")
public class ImageInfo implements Serializable {
  private static final long serialVersionUID = 2803225574295718845L;

  /**
   * 主键
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long surrogateId;

  /**
   * 图片分类id
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long imageCategoryId;

  /**
   * image全名称
   */
  private String name;

  /**
   * image原名
   */
  private String imageOriginalName;

  /**
   * image 类型后缀名
   */
  private String imageType;

  /**
   * image url link
   */
  private String imageUrl;

  /**
   * 备注
   */
  private String remark;

  /**
   * 状态
   */
  private Integer status;

  /**
   * 删除状态
   */
  private Integer deleted;

  /**
   * 创建人
   */
  private Long creatorId;

  /**
   * 修改人
   */
  private Long operator;

  /**
   * 创建时间
   */
  private Date createTime;

  /**
   * 更改时间
   */
  private Date updateTime;

  /**
   * image base64 code
   */
  private String imageBase64;
}
