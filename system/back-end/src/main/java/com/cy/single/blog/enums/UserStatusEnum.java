package com.cy.single.blog.enums;

/**
 * @Author: Lil-K
 * @Date: 2024/3/17
 * @Description:
 */
public enum UserStatusEnum {

    NORMAL(0, "正常"),
    FREEZE(1, "冻结"),
    DELETED(2, "删除")
        ;

    UserStatusEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    private final Integer code;
    private final String message;

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
