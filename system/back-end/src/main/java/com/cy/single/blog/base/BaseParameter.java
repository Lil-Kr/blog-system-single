package com.cy.single.blog.base;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
@ToString
@Data
public class BaseParameter implements Serializable {

    private static final long serialVersionUID = -4120652138040137224L;

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

}
