package com.cy.single.blog.pojo.req.sys.roleacl;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/31
 * @Description:
 */
@Data
@ToString
public class RoleAclSaveReq {

	public interface GroupUpdate {};

	public interface GroupUpdateRoleAcls {};
	/**
	 * 角色-权限id 唯一主键
	 */
	private Long surrogateId;

	/**
	 * 角色id
	 */
	@NotNull(groups = {RoleAclSaveReq.GroupUpdateRoleAcls.class}, message = "角色id不为空")
	private Long roleId;

	/**
	 * 单个
	 */
	@NotNull(message = "权限aclId不为空")
	private Long aclId;

	/**
	 * 待更新的权限点id list
	 *
	 */
	@NotEmpty(groups = RoleAclSaveReq.GroupUpdateRoleAcls.class, message = "aclIdList不能为空")
	private List<Long> aclIdList;
}
