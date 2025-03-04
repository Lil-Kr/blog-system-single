package com.cy.single.blog.pojo.req.role;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class RoleListPageReq extends BasePageReq {

    private Long surrogateId;

    /**
     * 角色名称
     */
    private String name;

    /**
     * 角色类型, 1超级管理员, 2管理员, 3.普通角色
     */
    private Integer type;

    private String remark;

    /**
     * 状态, 0正常，1冻结
     */
    private Integer status;

}