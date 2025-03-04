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
	 * =================== org ===================
	 **/
	public static final String ORG_PREV_NUMBER_INFO = "ORG";
	public static final String ORG_DELETE_EXIST_INFO = "待删除的组织下存在子组织, 不能删除";

	/**
	 * =================== role  ===================
	 **/
	public static final String ROLE_ROLE_TREE_INFO = "该角色下没有权限点明细";

}
