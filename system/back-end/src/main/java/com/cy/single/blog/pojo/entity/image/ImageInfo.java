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
import java.util.Date;

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
@TableName("image_info")
public class ImageInfo extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 2803225574295718845L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 唯一键
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long surrogateId;

    /**
     * 图片分类id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long imageCategoryId;

    /**
     * 编号
     */
    private String number;

    /**
     * image全名称
     */
    private String name;

    /**
     * image原名
     */
    private String imageOriginalName;

    /**
     * image 类型后缀名
     */
    private String imageType;

    /**
     * image url link
     */
    private String imageUrl;

    /**
     * 备注
     */
    private String remark;

    /**
     * 删除状态
     */
    private Integer deleted;

    /**
     * 创建人
     */
    private Long creatorId;

    /**
     * 修改人
     */
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
     * image base64 code
     */
    private String imageBase64;
}