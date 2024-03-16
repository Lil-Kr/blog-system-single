package com.cy.single.blog.aspect.exceptions;

import com.cy.single.blog.enums.ReturnCodeEnum;

/**
 * @Author: Lil-K
 * @Date: 2024/3/14
 * @Description: 业务异常处理
 */
public class BusinessException extends RuntimeException {
    private static final long serialVersionUID = 241314324519731138L;

    private ReturnCodeEnum returnCodeEnum;

    public BusinessException(String message){
        super(message);
    }

    public BusinessException(ReturnCodeEnum returnCodeEnum) {
        super(returnCodeEnum.getMessage());
        this.returnCodeEnum = returnCodeEnum;
    }

    public BusinessException(String message, ReturnCodeEnum returnCodeEnum) {
        super(message);
        this.returnCodeEnum = returnCodeEnum;
    }

    public ReturnCodeEnum getReturnCodeEnum() {
        return returnCodeEnum;
    }
}
