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
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("blog_content")
public class BlogContent extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

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

    private Integer original;

    private Integer recommend;

    /**
     * 博客文章标题
     */
    private String title;

    private String introduction;

    private String imgUrl;

    private String paragraph;

    private Date publishTime;

    /**
     * 博客分类ids
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long categoryId;

    /**
     * 博客标签ids, ","分隔
     */
    private String labelIds;

    /**
     * 博客专题id
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long topicId;

    /**
     * 文章字数
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long wordCount;

}
