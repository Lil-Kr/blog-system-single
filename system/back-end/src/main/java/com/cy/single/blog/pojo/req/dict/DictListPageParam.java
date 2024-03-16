package com.cy.single.blog.pojo.req.dict;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class DictListPageParam {

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
     * 数据字典主表id
     */
    @NotNull(message = "数据字典主表surrogate_id不能为空")
    private Long sysDictId;


    /**
     * 数据字典明细名称
     */
    private String name;

    /**
     * 备注
     */
    private String remark;
}

