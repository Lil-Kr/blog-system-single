package com.cy.single.blog.base;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description: 基础查询参数
 */
@ToString
@Data
public class BaseReq implements Serializable {

    private static final long serialVersionUID = 7567175837804014960L;

    private String keyWords;

    private Integer deleted;

    /**
     * 创建人
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long creatorId;

    /**
     * 修改人
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long modifierId;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更改时间
     */
    private Date updateTime;

    /**
     * 是否排序 ->  0:升序, 1:降序, null:不做排序
     */
    private Integer isOrder;
}
