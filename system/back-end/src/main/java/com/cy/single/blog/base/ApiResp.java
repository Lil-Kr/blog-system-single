package com.cy.single.blog.base;

import com.cy.single.blog.enums.ReturnCodeEnum;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.ToString;

import static com.cy.single.blog.enums.ReturnCodeEnum.SUCCESS;
import static com.cy.single.blog.enums.ReturnCodeEnum.SYSTEM_ERROR;

/**
 * API 响应体
 * @author Lil-Kr
 * @date 2018/6/8
 */
@Data
@ToString
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public final class ApiResp<T> {

    public static final String MSG_RENEWAL_SUCCESS = "renewal success";

    public static final String MSG_SUCCESS = "SUCCESS";

    public static final String MSG_ERROR = "ERROR";

    public static final String MSG_FAILURE = "FAILURE";

    /**响应码*/
    private Integer code;

    /**响应信息**/
    private String msg;

    /**响应数据**/
    private T data;

    public ApiResp(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    /**
     * create response body
     * @param code
     * @param msg
     * @param data
     * @return
     * @param <T>
     */
    public static <T> ApiResp<T> create(int code, String msg, T data) {
        return new ApiResp<>(code, msg, data);
    }

    /**
     * 成功
     * @param msg
     * @return
     */
    public static <T> ApiResp<T> success(String msg) {
        return create(SUCCESS.getCode(), msg,null);
    }

    /**
     * 成功
     * @return
     * @param <T>
     */
    public static <T> ApiResp<T> success() {
        return create(SUCCESS.getCode(), MSG_SUCCESS,null);
    }

    /**
     * 成功
     * @return
     * @param <T>
     */
    public static <T> ApiResp<T> success(ReturnCodeEnum returnCodeEnum) {
        return create(returnCodeEnum.getCode(), returnCodeEnum.getMessage(),null);
    }

    /**
     * 成功
     * @param data
     * @return
     */
    public static <T> ApiResp<T> success(T data) {
        return create(SUCCESS.getCode(), MSG_SUCCESS, data);
    }

    /**
     * 成功
     * @param msg
     * @param data
     * @return
     */
    public static <T> ApiResp<T> success(String msg, T data) {
        return create(SUCCESS.getCode(), msg, data);
    }

    /**
     * 失败
     * @return
     */
    public static <T> ApiResp<T> failure() {
        return create(SYSTEM_ERROR.getCode(), SYSTEM_ERROR.getMessage(),null);
    }

    /**
     * 失败
     * @param msg
     * @return
     */
    public static <T> ApiResp<T> failure(String msg) {
        return create(SYSTEM_ERROR.getCode(), msg,null);
    }

    /**
     * 失败
     * @param msg
     * @return
     */
    public static <T> ApiResp<T> failure(int code, String msg) {
        return create(code, msg,null);
    }

    /**
     *
     * @param returnCodeEnum
     * @return
     * @param <T>
     */
    public static <T> ApiResp<T> failure(ReturnCodeEnum returnCodeEnum) {
        return create(returnCodeEnum.getCode(), returnCodeEnum.getMessage(),null);
    }

    /**
     * 错误响应体
     * @param msg
     * @param data
     * @return
     */
    public static <T> ApiResp<T> error(String msg, T data) {
        return create(SYSTEM_ERROR.getCode(), msg, data);
    }

    /**
     *
     * @param code
     * @param msg
     * @param data
     * @return
     * @param <T>
     */
    public static <T> ApiResp<T> error(int code, String msg, T data) {
        return create(code, msg, data);
    }

    /**
     * 错误
     * @param msg
     * @return
     */
    public static <T> ApiResp<T> error(String msg) {
        return create(SYSTEM_ERROR.getCode(), msg, null);
    }

    /**
     * 错误
     * @return
     */
    public static <T> ApiResp<T> error() {
        return create(SYSTEM_ERROR.getCode(), SYSTEM_ERROR.getMessage(), null);
    }

    public static <T> ApiResp<T> error(int code, String msg) {
        return create(code, msg, null);
    }

    /**
     *
     * @param returnCodeEnum
     * @return
     * @param <T>
     */
    public static <T> ApiResp<T> error(ReturnCodeEnum returnCodeEnum) {
        return create(returnCodeEnum.getCode(), returnCodeEnum.getMessage(),null);
    }
}
