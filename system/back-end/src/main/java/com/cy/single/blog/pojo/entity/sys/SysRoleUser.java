package com.cy.single.blog.pojo.entity.sys;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-26
 */
@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_role_user")
public class SysRoleUser extends Model<SysRoleUser> {

  private static final long serialVersionUID = -9053806943463971084L;
  /**
   * 自增主键
   */
  @TableId(value = "id", type = IdType.AUTO)
  private Long id;

  /**
   * 角色-用户id唯一主键
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long surrogateId;

  /**
   * 角色id
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long roleId;

  /**
   * 用户id
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long userId;

  /**
   * 操作ip
   */
  private String operateIp;

  /**
   * 操作人
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

}
