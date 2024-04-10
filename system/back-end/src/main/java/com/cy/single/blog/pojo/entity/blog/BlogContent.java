package com.cy.single.blog.pojo.entity.blog;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.cy.single.blog.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.io.Serializable;

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
@Builder
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
    private Long surrogateId;

    /**
     * 编号
     */
    private String number;

    /**
     * 博客文章标题
     */
    private String title;

    /**
     * 博客分类ids
     */
    private Long type_ids;

    /**
     * 博客标签ids
     */
    private String lableIds;

    /**
     * 博客专题id
     */
    private Long topicId;

    /**
     * 博客内容, html文本格式
     */
    private String contentText;

    /**
     * 博客内容, markdown文本格式
     */
    private String markdownText;

    /**
     * 文章字数
     */
    private Long wordCount;


}
