package com.cy.single.blog.pojo.req.roleuser;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;

/**
 * @Description:
 * @Author: Lil-Kr
 * @Date: 2020/12/1
 */
@Data
@ToString
public class RoleUserParam {

    public interface GroupChangeRoleUsers {};

    public interface GroupRoleUserPageList {};

    /**
     * 自增主键
     */
    private Long id;

    /**
     * 角色-用户id唯一主键
     */
    private Long surrogateId;

//    /**
//     * 当前页码数
//     */
//    @NotNull(groups = {GroupRoleUserPageList.class},message = "当前页码数不能为空")
//    private Long current;
//
//    /**
//     * 每页记录数
//     */
//    @NotNull(groups = {GroupRoleUserPageList.class},message = "每页记录数不能为空")
//    private Long size;

    /**
     * 角色id
     */
    @NotNull(groups = {Default.class,GroupRoleUserPageList.class,GroupChangeRoleUsers.class},message = "角色roleId不为空")
    private Long roleId;

    /**
     * 多个角色id, 用逗号分隔
     */
    @NotNull(groups = {GroupChangeRoleUsers.class},message = "角色userId不为空")
    private String userIds;

    /**
     * 用户id
     */
    @NotNull(groups = {GroupChangeRoleUsers.class, Default.class},message = "用户id不为空")
    private Long userId;
}
