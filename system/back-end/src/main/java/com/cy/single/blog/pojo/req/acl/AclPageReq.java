package com.cy.single.blog.pojo.req.acl;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@ToString
@Data
public class AclPageReq extends BasePageReq implements Serializable {

    private static final long serialVersionUID = -821631108601312173L;

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