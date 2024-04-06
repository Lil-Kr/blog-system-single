package com.cy.single.blog.pojo.req.blog.label;

import com.cy.single.blog.base.BaseReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
@ToString
@Data
public class BlogLabelListReq extends BaseReq {

    private Long surrogateId;

    private Integer number;

    private String name;

    private String remark;

}
