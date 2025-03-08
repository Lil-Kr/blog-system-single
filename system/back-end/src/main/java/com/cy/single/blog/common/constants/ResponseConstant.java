package com.cy.single.blog.common.constants;

/**
 * @Author: Lil-K
 * @Date: 2025/2/25
 * @Description:
 */
public class ResponseConstant {

	public static final String LOGIN_SUCCESS = "登陆成功";
	public static final String LOGOUT_SUCCESS = "用户已退出";

	/**
	 * =================== image ===================
	 */
	public static final String RESPONSE_UPLOAD_IMAGE_ERROR_INFO = "图片格式或命名错误, 请修改";
	public static final String IMAGE_SIZE_ERROR = "image size cannot be larger than 15MB";

	/**
	 * =================== role  ===================
	 **/
	public static final String ROLE_TREE_INFO = "该角色下没有权限点明细";
	public static final String ROLE_ONLY_ADMIN_INFO = "超级管理员必须唯一";
	public static final String ROLE_USED_INFO = "该角色已被使用, 无法删除";
	public static final String ROLE_CANNOT_FREEZE = "超级管理员无法被冻结";

}
