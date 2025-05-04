package com.cy.single.blog.pojo.entity.sys;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

/**
 * <p>
 *
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-29
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_dict_detail")
public class SysDictDetail extends Model<SysDictDetail> {

  private static final long serialVersionUID = -1734025655498001710L;
  /**
   * 数据字典id主键
   */
  @TableId(value = "surrogate_id")
  @JsonSerialize(using = ToStringSerializer.class)
  private Long surrogateId;

  /**
   * 数据字典主表id
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long parentId;

  /**
   * 数据字典明细名称
   */
  private String name;

  private Integer type;

  /**
   * 备注
   */
  private String remark;

}
