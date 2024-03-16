package com.cy.single.blog.pojo.req.org;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class OrgDeleteParam {

    /**
     * 自增主键
     */
    @NotNull(message = "自增id不能为空")
    private Long id;

    /**
     * 组织唯一主键
     */
    @NotNull(message = "组织surrogateId不能为空")
    private Long surrogateId;
}
