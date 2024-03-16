package com.cy.single.blog.pojo.req.org;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class OrgListAllParam {

    public interface GroupPage {};

    /**
     * 当前页码数
     */
    @NotNull(groups = {GroupPage.class},message = "当前页码数不能为空")
    private Long current;

    /**
     * 每页记录数
     */
    @NotNull(groups = {GroupPage.class},message = "每页记录数不能为空")
    private Long size;

    // 组织编号
    private String number;

    // 组织名
    private String name;

}
