package com.cy.single.blog.pojo.req.aclmodule;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@ToString
public class AclModuleParam {


    /**
     * 自增主键
     */
    private Long id;

    /**
     * 权限模块id,唯一主键
     */
    private Long surrogateId;

    /**
     * 权限模块名称
     */
    @NotNull(message = "权限模块名称不能为空")
    @Length(min = 2,max = 22,message = "权限名长度必须在2~50个字符之间")
    private String name;

    /**
     * 父id
     * 默认0
     */
    private Long parentId=0l;

    /**
     * 上级权限模块surrogateId
     */
    @NotNull(message = "上级权限模块的parentSurrogateId不能为空")
    private Long parentSurrogateId;

    /**
     * 顺序
     */
    @NotNull(message = "顺序不能为空")
    private Integer seq;

    /**
     * 0正常, 1冻结
     */
    @NotNull(message = "权限模块状态不能为空")
    @Max(value = 1)
    @Min(value = 0)
    private Integer status;

    /**
     * 备注
     */
    @Length(max = 100, message = "备注需要在64个字符之间")
    private String remark;

}