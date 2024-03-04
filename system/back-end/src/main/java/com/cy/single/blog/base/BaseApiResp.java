package com.cy.single.blog.base;

import lombok.Data;
import lombok.ToString;
import org.apache.logging.log4j.util.Strings;

import java.util.HashMap;
import java.util.Map;

/**
 * API 响应
 * @author Lil-Kr
 * @date 2018/6/8
 */
@Data
@ToString
public final class BaseApiResp {

    public static final int STATUS_ERROR = 1;
    public static final int STATUS_SUCCESS = 0;

    /**状态码*/
    public int statusCode = STATUS_ERROR;
    /**错误消息*/
    private String errMsg = Strings.EMPTY;
    /**操作*/
    private String action = Strings.EMPTY;
    /**响应数据*/
    private Map<String, Object> data;

    public static BaseApiResp newInstance(String action, int statusCode) {
        BaseApiResp resp = new BaseApiResp();
        resp.action = action;
        resp.statusCode = statusCode;
        return resp;
    }

    public static BaseApiResp success(String action) {
        return newInstance(action, STATUS_SUCCESS);
    }

    public static BaseApiResp error(String errMsg) {
        return error(Strings.EMPTY, errMsg);
    }

    public static BaseApiResp error(String action, String errMsg) {
        BaseApiResp resp = newInstance(action, STATUS_ERROR);
        resp.errMsg = errMsg;
        return resp;
    }

    public BaseApiResp statusCode(int statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    public BaseApiResp set(String key , Object val){
        if (data == null) {
            data = new HashMap();
        }
        data.put(key, val);
        return this;
    }


}
