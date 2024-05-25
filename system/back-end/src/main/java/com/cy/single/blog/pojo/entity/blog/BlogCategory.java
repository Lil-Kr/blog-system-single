package com.cy.single.blog.pojo.entity.blog;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.cy.single.blog.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
@EqualsAndHashCode(callSuper = false)
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("blog_category")
@Data
public class BlogCategory extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 唯一键
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long surrogateId;

    /**
     * 编号
     */
    private String number;

    /**
     * 类别名称
     */
    private String name;

    /**
     * 备注
     */
    private String remark;

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
