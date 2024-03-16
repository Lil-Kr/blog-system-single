package com.cy.single.blog.pojo.req.aclmodule;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class AclModuleDelParam {

    private Long id;

    /**
     * 权限模块surrogateId,唯一主键
     */
    @NotNull(message = "权限模块surrogateId不能为空")
    private Long surrogateId;
}
