package com.cy.single.blog.pojo.req.user;

import com.cy.single.blog.base.BaseReq;
import com.cy.single.blog.utils.checkUtil.CheckUtil;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * @Author: Lil-K
 * @Date: 2024/3/17
 * @Description:
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserRegisterReq extends BaseReq {

    /**
     * 登录账号
     */
    @NotNull(message = "账号不能为空")
    @Length(min=6, max=25, message = "账号长度必须在6到25个字符之间")
    @Pattern(regexp = CheckUtil.ACCOUNT_REGEXP, message = "账号必须以下划线字母数字开头")
    private String account;

    /**
     * 用户名
     */
    @NotNull(message = "昵称不能为空")
    @Length(max=20, message = "昵称长度过长, 必须在20个字符以内")
    private String adminName;

    /**
     * 邮箱
     */
    @Pattern(regexp = CheckUtil.EMAIL_REGEXP,message = "邮件不合法")
    private String email;

    /**
     * 密码
     */
    @NotNull(message = "账号不能为空")
    @Length(min=6, max=30, message = "密码长度必须在6到30位之间")
    private String password;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
