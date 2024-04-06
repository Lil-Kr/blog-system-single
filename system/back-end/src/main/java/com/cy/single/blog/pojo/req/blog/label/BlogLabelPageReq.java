package com.cy.single.blog.pojo.req.blog.label;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/4/4
 * @Description:
 */
@ToString
@Data
public class BlogLabelPageReq extends BasePageReq {

    private Long surrogateId;

    private Integer number;

    private String name;

    private String remark;
}
