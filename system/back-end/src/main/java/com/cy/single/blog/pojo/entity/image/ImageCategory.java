package com.cy.single.blog.pojo.entity.image;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.cy.single.blog.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;

import java.io.Serializable;

/**
 * @author 
 * 
 */
@EqualsAndHashCode(callSuper = false)
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("image_category")
public class ImageCategory extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 8790752325866544648L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

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
     * image全名称
     */
    private String name;

    /**
     * 标题图url
     */
    private String imageUrl;

}