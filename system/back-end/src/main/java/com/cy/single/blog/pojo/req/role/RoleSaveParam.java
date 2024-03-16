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
public class RoleSaveParam {

    public interface GroupTreeOrDel {};

    /**
     * 角色自增id
     */
    private Long id;

    /**
     * 角色id唯一主键
     */
    @NotNull(groups = {GroupTreeOrDel.class},message = "surrogateId不能为空")
    private Long surrogateId;

    /**
     * 角色名称
     */
    @NotBlank(message = "角色名不能为空")
    @Length(min = 2,max = 20,message = "角色名长度2~20个字符")
    private String name;

    /**
     * 角色类型, 1超级管理员, 2管理员, 3.普通角色
     */
    @NotNull(message = "角色类型不能为空")
    @Min(value = 1)
    @Max(value = 3)
    private Integer type;

    /**
     * 备注
     */
    @Length(min = 2,max = 200,message = "备注长度2~200个字符之间")
    private String remark;
}
