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
@ToString
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("blog_label")
public class BlogLabel implements Serializable {

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

	/**
	 * 标签名
	 */
	private String name;

	/**
	 * 标签颜色
	 */
	private String color;

	/**
	 * 前端展示颜色
	 */
	private String colorText;


	private Integer status;

	/**
	 * 备注
	 */
	private String remark;

	/**
	 * 默认 0
	 */
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
