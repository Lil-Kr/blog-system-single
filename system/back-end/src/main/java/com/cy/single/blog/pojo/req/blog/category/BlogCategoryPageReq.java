package com.cy.single.blog.pojo.req.blog.category;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description:
 */
@ToString
@Data
public class BlogCategoryPageReq extends BasePageReq {

    private Long surrogateId;

    private Integer number;

    private String name;

    private String remark;
}