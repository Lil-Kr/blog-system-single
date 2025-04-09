package com.cy.single.blog.pojo.entity.sys;

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
 * @author Lil-Kr
 * @since 2020-11-24
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("sys_org")
public class SysOrg implements Serializable {

  private static final long serialVersionUID = -7550398728976097181L;
  /**
   * 自增主键
   */
  @TableId(value = "id", type = IdType.AUTO)
  private Long id;

  /**
   * 唯一主键
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long surrogateId;

  /**
   * 组织编号
   */
  private String number;

  /**
   * 组织名称
   */
  private String name;

  /**
   * 父id
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long parentId;

  /**
   * 组织层级, 0. / 0.1, 0.2
   */
  private String level;

  /**
   * 排序, 组织咋当前层级目录下的顺序
   */
  private Integer seq;

  /**
   * 0: 正常, 1: 异常, 2: 未知
   */
  private Integer status;

  private String remark;

  /**
   * 默认 0
   */
  private Integer deleted = 0;

  @JsonSerialize(using = ToStringSerializer.class)
  private Long creatorId;

  /**
   * 操作人
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long operator;

  /**
   * 操作ip
   */
  private String operateIp;

  /**
   * 创建时间
   */
  private Date createTime;

  /**
   * 更改时间
   */
  private Date updateTime;
}
