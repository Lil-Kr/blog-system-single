package com.cy.single.blog.pojo.req.user;

import com.cy.single.blog.utils.checkUtil.CheckUtil;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.groups.Default;

@ToString
@Data
public class UserSaveReq {

    public interface GroupGetUserAcl {}
    public interface GroupAdminLogin {}
    public interface GroupAddUser {}
    public interface GroupEditUser {}

    private Long id;

    @NotNull(groups = {GroupGetUserAcl.class, Default.class, GroupEditUser.class}, message = "surrogateId不能为空")
    private Long surrogateId;

    /**
     * 用户注册账号
     */
    @NotNull(groups = {Default.class},message = "用户账号不能为空")
    @Length(groups = {Default.class}, max = 15, message = "用户账号长度必须在15个字符以内")
    private String account;

    /**
     * 用户姓名
     */
    @NotNull(groups = {Default.class, GroupAddUser.class},message = "昵称不能为空")
    @Length(groups = {Default.class, GroupAddUser.class},min = 2,max = 20, message = "昵称长度必须在2到20个字符之间")
    private String userName;

    /**
     * 用户手机号
     */
    @Length(groups = {Default.class, GroupAddUser.class}, min = 11, max = 11, message = "请输入正确的手机号")
    @Pattern(groups = {Default.class, GroupAddUser.class}, regexp = "^\\d{11}$", message = "手机号必须是11位数字")
    private String telephone;

    /**
     * 邮箱
     */
    @NotNull(groups = {Default.class, GroupAddUser.class},message = "用户邮箱不能为空")
    @Pattern(groups = {Default.class, GroupAddUser.class},regexp = CheckUtil.EMAIL_REGEXP, message = "邮箱格式不正确")
    private String email;

    /**
     * 用户所在组织id
     */
    @NotNull(groups = {Default.class, GroupAddUser.class},message = "用户所在组织不能为空")
    private Long orgId;

    /**
     * 状态, 0正常, 1异常, 2: 未知
     */
    @NotNull(message = "状态不能为空", groups = {GroupAddUser.class})
    @Min(groups = {Default.class, GroupAddUser.class}, value = 0, message = "状态类型范围0~2")
    @Max(groups = {Default.class, GroupAddUser.class}, value = 2, message = "状态类型范围0~2")
    private Integer status;

    /**
     * 备注
     */
    @Length(groups = {Default.class}, max = 100, message = "备注不能超过100个字符")
    private String remark;

}