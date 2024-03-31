package com.cy.single.blog.pojo.req.blog;

import com.cy.single.blog.base.BaseDO;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
@ToString
@Data
public class BlogLabelListReq extends BaseDO {

    private Long id;

    private Long surrogateId;

    private Integer number;

    private String name;

    private String remark;

}
