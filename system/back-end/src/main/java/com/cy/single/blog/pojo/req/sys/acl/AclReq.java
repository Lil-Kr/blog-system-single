package com.cy.single.blog.pojo.req.sys.acl;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2025/3/21
 * @Description: AclReq
 */
@Data
@ToString
public class AclReq {

	public interface GroupAcls {}

	/**
	 * 自增主键
	 */
	private Long id;

	/**
	 * 权限id唯一主键
	 */
	@NotNull(groups = {GroupAcls.class}, message = "surrogateId不能为空")
	private Long surrogateId;

	/**
	 * 权限名
	 */
	@NotBlank(message = "name权限点名不能为空")
	@Length(min = 2,max = 20,message = "权限名长度为2~20个字符之间")
	private String name;

	/**
	 * 权限模块id
	 */
	@NotNull(message = "aclModuleId不能为空")
	private Long aclModuleId;

	/**
	 * 请求的url
	 */
	@Length(min = 1,max = 100,message = "权限点的url长度为 1~100 个字符之间")
	private String url;

	/**
	 * 1:菜单权限, 2按钮权限, 3其他
	 */
	@NotNull(message = "type 权限点类型不能为空")
	private Integer type;

	/**
	 * 菜单名
	 */
	@Length(min = 1,max = 50, message = "菜单名名范围 1~50 在之间")
	private String menuName;

	/**
	 * 菜单url, 路由url
	 */
	@Length(min = 1, max = 200, message = "权限点的url长度为 1~200 个字符之间")
	private String menuUrl;

	/**
	 *
	 */
	@Length(min = 1, max = 100, message = "按钮标识长度在 1~100 个字符之间")
	private String btnSign;


	/**
	 * 状态 0 正常 ,1 冻结
	 */
	@NotNull(message = "status状态不能为空")
	@Min(value = 0, message = "状态范围在 0~10 之间")
	@Max(value = 10, message = "状态范围在 0~10 之间")
	private Integer status;

	/**
	 * 排序
	 */
	@NotNull(message = "权限点顺序不能为空")
	private Integer seq;

	/**
	 * 备注
	 */
	@Length(min = 1,max = 100,message = "权限点备注长度为1~100个字符之间")
	private String remark;
}
