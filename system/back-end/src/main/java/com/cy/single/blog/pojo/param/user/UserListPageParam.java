package com.cy.single.blog.pojo.param.user;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class UserListPageParam {

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
     * 员工姓名
     */
    private String userName;

    /**
     * 员工电话
     */
    private String telephone;

    /**
     * 邮箱
     */
    private String mail;

    /**
     * 用户所在组织id
     */
    private Long orgId;

    /**
     * 状态, 0正常, 1冻结, 2: 删除
     */
    private Integer status = 0;

    /**
     * 备注
     */
    private String remark;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 更改时间
     */
    private String updateTime;
}
