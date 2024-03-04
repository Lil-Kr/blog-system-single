package com.cy.single.blog.pojo.param.role;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class RoleListPageParam {

    /**
     * 当前页码数
     */
    @NotNull(message = "当前页码数不能为空")
    private Long current;

    /**
     * 每页记录数
     */
    @NotNull(message = "每页记录数不能为空")
    private Long size;

    /**
     * 角色名称
     */
    private String name;

    /**
     * 角色类型, 1超级管理员, 2管理员, 3.普通角色
     */
    private Integer type;

    /**
     * 状态, 0正常，1冻结
     */
    private Integer status;

}