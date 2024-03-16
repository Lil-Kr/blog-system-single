package com.cy.single.blog.pojo.req.user;

import lombok.ToString;

import javax.validation.constraints.NotNull;

@ToString
public class UserDeleteReq {

    @NotNull(message = "id不能为空")
    private Long id;

    @NotNull(message = "surrogateId不能为空")
    private Long surrogateId;

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
}
