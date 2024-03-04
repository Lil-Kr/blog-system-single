package com.cy.single.blog.pojo.param.acl;

import lombok.ToString;
import javax.validation.constraints.NotNull;

@ToString
public class AclPageParam {

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
     * 自增主键
     */
    private Long id;

    /**
     * 权限id唯一主键
     */
    private Long surrogateId;

    /**
     * 权限名
     */
    private String name;

    /**
     * 权限模块id
     */
    private Long aclModuleId;

    /**
     * 请求的url
     */
    private String url;

    /**
     * 1:菜单权限, 2按钮权限, 3其他
     */
    private Integer type;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 排序
     */
    private Integer seq;

    /**
     * 备注
     */
    private String remark;

}