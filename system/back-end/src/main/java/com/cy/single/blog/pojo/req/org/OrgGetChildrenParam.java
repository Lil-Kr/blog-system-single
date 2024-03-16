package com.cy.single.blog.pojo.req.org;


import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class OrgGetChildrenParam {

    @NotNull(message = "组织surrogateId不能为空")
    private Long surrogateId;

}
