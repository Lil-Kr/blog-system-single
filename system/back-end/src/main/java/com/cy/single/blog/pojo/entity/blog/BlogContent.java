package com.cy.single.blog.pojo.entity.blog;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.cy.single.blog.base.BaseDO;
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
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("blog_content")
public class BlogContent extends BaseDO implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 唯一键
     */
    private Long surrogateId;

    /**
     * 编号
     */
    private Integer number;

    /**
     * 博客文章标题
     */
    private String title;

    /**
     * 博客分类ids
     */
    private Long tpyeIds;

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

    /**
     * 备注
     */
    private String remark;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getSurrogateId() {
        return surrogateId;
    }

    public void setSurrogateId(Long surrogateId) {
        this.surrogateId = surrogateId;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getTpyeIds() {
        return tpyeIds;
    }

    public void setTpyeIds(Long tpyeIds) {
        this.tpyeIds = tpyeIds;
    }

    public String getLableIds() {
        return lableIds;
    }

    public void setLableIds(String lableIds) {
        this.lableIds = lableIds;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public String getMarkdownText() {
        return markdownText;
    }

    public void setMarkdownText(String markdownText) {
        this.markdownText = markdownText;
    }

    public Long getWordCount() {
        return wordCount;
    }

    public void setWordCount(Long wordCount) {
        this.wordCount = wordCount;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

}
