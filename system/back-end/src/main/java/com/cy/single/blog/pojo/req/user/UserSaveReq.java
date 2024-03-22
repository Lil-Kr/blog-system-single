package com.cy.single.blog.pojo.req.user;

import com.cy.single.blog.utils.checkUtil.CheckUtil;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;
import javax.validation.groups.Default;

@ToString
public class UserSaveReq {

    public interface GroupGetUserAcl {}

    public interface GroupAdminLogin {}

    private Long id;

    @NotNull(groups = {GroupGetUserAcl.class, Default.class},message = "获取用户权限点信息时surrogateId不能为空")
    private Long surrogateId;

    /**
     * 用户注册账号
     */
    @NotNull(groups = {Default.class},message = "用户账号不能为空")
    @Length(groups = {Default.class},max = 50, message = "用户账号长度必须在50个字符以内")
    private String account;

    /**
     * 用户姓名
     */
    @NotNull(groups = {Default.class},message = "用户名不能为空")
    @Length(groups = {Default.class},min = 2,max = 20, message = "用户名长度必须在2到20个字符之间")
    private String adminName;

    /**
     * 用户手机号
     */
    @NotNull(groups = {Default.class},message = "用户名手机号不能为空")
    @Length(groups = {Default.class}, min = 13, max = 13, message = "请输入正确的手机号")
    private String telephone;

    /**
     * 邮箱
     */
    @NotNull(groups = {Default.class},message = "用户邮箱不能为空")
    @Pattern(groups = {Default.class},regexp = CheckUtil.EMAIL_REGEXP,message = "邮箱格式不正确")
    private String email;

    /**
     * 用户所在组织id
     */
    @NotNull(groups = {Default.class},message = "用户所在组织不能为空")
    private Long orgId;

    /**
     * 状态, 0正常, 1冻结
     */
    @Min(groups = {Default.class},value = 1, message = "状态不合法")
    @Max(groups = {Default.class},value = 2, message = "状态不合法")
    private Integer status = 0;

    /**
     * 删除状态 0正常, 1删除
     */
    private Integer deleted = 0;

    /**
     * 备注
     */
    @Length(groups = {Default.class},max = 100, message = "备注不能超过100个字符")
    private String remark;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 更改时间
     */
    private String updateTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSurrogateId() {
        return surrogateId;
    }

    public void setSurrogateId(Long surrogateId) {
        this.surrogateId = surrogateId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getOrgId() {
        return orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getDeleted() {
        return deleted;
    }

    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }
}