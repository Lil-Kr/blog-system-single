package com.cy.single.blog.aspect;

import com.cy.single.blog.aspect.exceptions.BusinessException;
import com.cy.single.blog.base.ApiResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/3/11
 * @Description: 全局异常处理
 */
@RestControllerAdvice
@Configuration
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 参数校验异常捕获
     * @param request
     * @param exception
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseBody
    public ApiResp<String> validateException(HttpServletRequest request,
                                     MethodArgumentNotValidException exception) throws Exception {
        BindingResult bindingResult = exception.getBindingResult();
        /*Map errorMesssageMap = Maps.newHashMap();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            errorMesssageMap.put(fieldError.getField(), fieldError.getDefaultMessage());
        }*/

        List<String> errorMsgList = new ArrayList<>();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        for (int i = 0; i < fieldErrors.size(); i++) {
            errorMsgList.add(fieldErrors.get(i).getDefaultMessage());
        }

        return ApiResp.error(errorMsgList.toString());
    }

    /**
     * 请求内容无法正确解析或读取异常捕获
     * @param request
     * @param exception
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    @ResponseBody
    public ApiResp<String> validateException(HttpServletRequest request, HttpMessageNotReadableException exception) throws Exception {
        String message = exception.getMessage();
        /*Map errorMesssageMap = Maps.newHashMap();
        errorMesssageMap.put(msg, message);*/
        return ApiResp.error(message);
    }

    /**
     * 捕捉Controller全局异常
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ApiResp<String> defaultExceptionHandler(HttpServletRequest req, Exception e) throws Exception {
        log.error("global exception msg: {}", e.getLocalizedMessage());
        e.printStackTrace();
        return ApiResp.error( "网络异常", e.getLocalizedMessage());
    }

    /**
     * 捕捉Controller全局自定义异常
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    public ApiResp<String> businessExceptionHandler(HttpServletRequest req, BusinessException e) throws Exception {
        log.warn("business exception msg: {}", e.getLocalizedMessage());
        return ApiResp.error(e.getReturnCodeEnum().getCode() , e.getReturnCodeEnum().getMessage());
    }
}