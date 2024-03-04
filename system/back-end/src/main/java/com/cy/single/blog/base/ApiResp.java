package com.cy.single.blog.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.ToString;

/**
 * API 响应体
 * @author Lil-Kr
 * @date 2018/6/8
 */
@Data
@ToString
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public final class ApiResp<T> {
    /** 错误编码 */
    public static final int CODE_ERROR = -1;
    /**
     * token校验失败错误码
     */
    public static final int CODE_ERROR_TOKEN = 1000;

    public static final int CODE_ERROR_TOKEN_EXPIRED = 1001;

    public static final String MSG_RENEWAL_SUCCESS = "renewal success";

    /** 失败编码 */
    public static final int CODE_FAILURE = 1;

    /** 成功编码 */
    public static final int CODE_SUCCESS = 0;

    public static final String MSG_SUCCESS = "SUCCESS";

    public static final String MSG_ERROR = "ERROR";

    public static final String MSG_FAILURE = "FAILURE";

    /**响应码*/
    private int code;

    /**响应信息**/
    private String msg;

    /**响应数据**/
    private T data;

    /**
     * 创建响应体
     * @param code
     * @param msg
     * @param data
     * @return
     */
//    public static ApiResp create(int code, String msg, Object data) {
//        return new ApiResp(code,msg,data);
//    }
    public static <T> ApiResp<T> create(int code, String msg, T data) {
        return new ApiResp(code,msg,data);
    }

    /**
     * 成功
     * @param msg
     * @return
     */
    public static <T> ApiResp<T> success(String msg) {
        return create(CODE_SUCCESS,msg,null);
    }

    /**
     * 成功
     * @param data
     * @return
     */
    public static <T> ApiResp<T> success(T data) {
        return create(CODE_SUCCESS,MSG_SUCCESS,data);
    }

    /**
     * 成功
     * @param msg
     * @param data
     * @return
     */
    public static <T> ApiResp<T> success(String msg, T data) {
        return create(CODE_SUCCESS,msg,data);
    }

    /**
     * 失败
     * @param msg
     * @param data
     * @return
     */
    public static <T> ApiResp<T> failure(String msg, T data) {
        return create(CODE_FAILURE,msg,data);
    }

    /**
     * 失败
     * @param msg
     * @return
     */
    public static <T> ApiResp<T> failure(String msg) {
        return create(CODE_FAILURE,msg,null);
    }


    /**
     * 错误
     * @param msg
     * @param data
     * @return
     */
    public static <T> ApiResp<T> error(String msg, T data) {
        return create(CODE_ERROR,msg, data);
    }

    /**
     * 错误
     * @param msg
     * @return
     */
    public static <T> ApiResp<T> error(String msg) {
        return create(CODE_ERROR,msg, null);
    }

    public static <T> ApiResp<T> error(int code, String msg) {
        return create(code,msg, null);
    }

    /**
     * token 相关error
     * @param msg
     * @return
     */
    public static <T> ApiResp<T> errorToken(String msg) {
        return create(CODE_ERROR_TOKEN, msg, null);
    }

    public static <T> ApiResp<T> errorToken(String msg, T data) {
        return create(CODE_ERROR_TOKEN, msg, data);
    }

    public static <T> ApiResp<T> expirationTokenError(String msg,T data) {
        return create(CODE_ERROR_TOKEN_EXPIRED, msg, data);
    }

    public ApiResp(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
