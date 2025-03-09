package com.cy.single.blog.pojo.req.aclmodule;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@ToString
public class AclModuleReq {

    public interface GroupAdd {}
    public interface GroupEdit {}

    /**
     * 自增主键
     */
    private Long id;

    /**
     * 权限模块id,唯一主键
     */
    @NotNull(message = "surrogateId不能为空", groups = {GroupEdit.class})
    private Long surrogateId;

    /**
     * 权限模块名称
     */
    @NotNull(message = "权限模块名称不能为空", groups = {GroupAdd.class})
    @Length(min = 2,max = 22,message = "权限名长度必须在2~50个字符之间", groups = {GroupAdd.class})
    private String name;

    /**
     * 父id
     * 默认0
     */
    private Long parentId = 0l;

    /**
     * 上级权限模块surrogateId
     */
    @NotNull(message = "上级权限模块的parentSurrogateId不能为空", groups = {GroupAdd.class})
    private Long parentSurrogateId;

    /**
     * 顺序
     */
    @NotNull(message = "顺序不能为空", groups = {GroupAdd.class})
    private Integer seq;

    /**
     * 0正常, 1冻结, 2异常
     */
    @NotNull(message = "权限模块状态不能为空", groups = {GroupAdd.class})
    @Min(value = 0, message = "权限模块状态在0~2之间", groups = {GroupAdd.class})
    @Max(value = 2, message = "权限模块状态在0~2之间", groups = {GroupAdd.class})
    private Integer status;

    /**
     * 备注
     */
    @Length(max = 100, message = "备注需要在64个字符之间")
    private String remark;

}