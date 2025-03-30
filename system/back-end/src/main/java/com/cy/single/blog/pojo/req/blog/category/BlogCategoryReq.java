package com.cy.single.blog.pojo.req.blog.category;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;

import static com.cy.single.blog.common.constants.CommonConstants.DEFAULT_COLOR;

/**
 * @Author: Lil-K
 * @Date: 2025/3/30
 * @Description:
 */
@ToString
@Data
public class BlogCategoryReq {

	public interface GroupTypeAdd {}
	public interface GroupTypeEdit {}
	public interface GroupTypeDel {}
	public interface GroupTypeDelBatch {}

	@NotNull(groups = {BlogCategoryReq.GroupTypeEdit.class, BlogCategoryReq.GroupTypeDel.class}, message = "surrogateId是必须的")
	private Long surrogateId;

	/**
	 * batch operation
	 */
	@NotBlank(groups = {BlogCategoryReq.GroupTypeDelBatch.class}, message = "批量删除surrogateId不能为空")
	private List<Long> surrogateIds;

	@NotBlank(groups = {BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, message = "编号不能为空")
	private String number;

	@NotBlank(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class}, message = "标签类型名不能为空")
	@Length(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, max = 50, message = "标签类型名长度在50个字符以内")
	private String name;

	/**
	 * 颜色
	 */
	@Length(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, max = 50, message = "后台展示颜色不能为空, 请输入正确的颜色禁制码")
	private String color = DEFAULT_COLOR;

	@Length(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, max = 200, message = "备注长度必须在200个字符以内")
	private String remark;

	private Integer status;

	private Integer deleted;
}
