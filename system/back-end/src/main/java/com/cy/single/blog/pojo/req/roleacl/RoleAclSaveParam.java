package com.cy.single.blog.pojo.req.roleacl;


import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class RoleAclSaveParam {

    public interface GroupUpdate {};

    public interface GroupChangeAcls {};
    /**
     * 角色-权限id唯一主键
     */
    private Long surrogateId;

    /**
     * 角色id
     */
    @NotNull(groups = {GroupChangeAcls.class},message = "角色id不为空")
    private Long roleId;

    /**
     * 单个
     */
    @NotNull(message = "权限aclId不为空")
    private Long aclId;

    /**
     * 多个权限id,用,号分隔
     */
    @NotBlank(groups = GroupChangeAcls.class,message = "权限aclIds不为空")
    private String aclIds;

}
