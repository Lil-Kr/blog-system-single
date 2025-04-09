package com.cy.single.blog.pojo.req.role;


import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@ToString
public class RoleSaveReq {

  public interface GroupTreeOrDel {};
  public interface GroupAdd {};
  public interface GroupEdite {};
  public interface GroupFreeze {};

  /**
   * 角色自增id
   */
  private Long id;

  /**
   * 角色id 唯一主键
   */
  @NotNull(groups = {GroupTreeOrDel.class, GroupFreeze.class, GroupEdite.class}, message = "角色id不能为空")
  private Long roleId;

  /**
   * 角色名称
   */
  @NotBlank(groups = {GroupAdd.class}, message = "角色名不能为空")
  @Length(groups = {GroupAdd.class}, min = 2,max = 20, message = "角色名长度2~20个字符")
  private String name;

  /**
   * 角色类型, 1.超级管理员, 2.管理员, 3.普通角色
   */
  @NotNull(groups = {GroupAdd.class, GroupEdite.class}, message = "角色类型不能为空")
  private Integer type;

  /**
   * 状态
   */
  @NotNull(groups = {GroupAdd.class, GroupEdite.class}, message = "角色类型不能为空")
  @Min(groups = {GroupAdd.class, GroupEdite.class, GroupFreeze.class}, value = 0, message = "状态范围再0~9之间")
  @Max(groups = {GroupAdd.class, GroupEdite.class, GroupFreeze.class}, value = 9, message = "状态范围再0~9之间")
  private Integer status;

  /**
   * 备注
   */
  @Length(groups = {GroupAdd.class, GroupEdite.class}, min = 2,max = 200, message = "备注长度2~200个字符之间")
  private String remark;

}
