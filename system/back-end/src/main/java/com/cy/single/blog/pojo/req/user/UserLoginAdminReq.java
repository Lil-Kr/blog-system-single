package com.cy.single.blog.pojo.req.user;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2024/3/14
 * @Description:
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserLoginAdminReq {

    private String token;

    private String account;

    @NotNull(message = "密码不能为空")
    private String pwd;

    private String email;

    public String getAccount() {
        return account;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
