package com.cy.single.blog.pojo.param.acl;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@ToString
public class AclParam {

    public interface GroupAcls {}

    /**
     * 自增主键
     */
    private Long id;

    /**
     * 权限id唯一主键
     */
    @NotNull(groups = {GroupAcls.class},message = "surrogateId不能为空")
    private Long surrogateId;

    /**
     * 权限名
     */
    @NotBlank(message = "name权限点名不能为空")
    @Length(min = 2,max = 20,message = "权限名长度为2~20个字符之间")
    private String name;

    /**
     * 权限模块id
     */
    @NotNull(message = "权限模块surrogate_id不能为空")
    private Long aclModuleId;

    /**
     * 请求的url
     */
    @Length(min = 5,max = 20,message = "权限点的url长度为5~100个字符之间")
    private String url;

    /**
     * 1:菜单权限, 2按钮权限, 3其他
     */
    @NotNull(message = "type权限点类型不能为空")
    private Integer type;

    /**
     * 状态 0 正常 ,1 冻结
     */
    @NotNull(message = "status状态不能为空")
    @Max(value = 1)
    @Min(value = 0)
    private Integer status;

    /**
     * 排序
     */
    @NotNull(message = "权限点顺序不能为空")
    private Integer seq;

    /**
     * 备注
     */
    @Length(min = 1,max = 100,message = "权限点备注长度为1~100个字符之间")
    private String remark;
}