package com.cy.single.blog.pojo.entity.blog;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
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
public class BlogContent implements Serializable {

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

	@JsonSerialize(using = ToStringSerializer.class)
	private Long original;

	@JsonSerialize(using = ToStringSerializer.class)
	private Long recommend;

	/**
	 * 博客文章标题
	 */
	private String title;

	private String introduction;

	private String imgUrl;

	private String paragraph;

	private String contentText;

	private Date publishTime;

	/**
	 * 博客分类id
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

	@JsonSerialize(using = ToStringSerializer.class)
	private Long status;

	private String remark;

	private Integer deleted = 0;
	/**
	 * 创建人
	 */
	@JsonSerialize(using = ToStringSerializer.class)
	private Long creatorId;

	/**
	 * 修改人
	 */
	@JsonSerialize(using = ToStringSerializer.class)
	private Long operator;

	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 更改时间
	 */
	private Date updateTime;
}
