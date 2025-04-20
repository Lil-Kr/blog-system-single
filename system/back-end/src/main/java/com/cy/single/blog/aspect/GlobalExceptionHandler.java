package com.cy.single.blog.aspect;

import com.cy.single.blog.base.ApiResp;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
   * com.fasterxml.jackson.databind.exc.InvalidFormatException
   * @param request
   * @param exception
   * @return
   */
  @ExceptionHandler(value = MissingServletRequestParameterException.class)
  @ResponseBody
  public ApiResp<String> validateParameterException(HttpServletRequest request,
                                                    MissingServletRequestParameterException exception) {
    String message = exception.getMessage();
    return ApiResp.warning(message);
  }

  /**
   * 校验参数类型不一致
   * @param request
   * @param exception
   * @return
   */
  @ExceptionHandler(value = MethodArgumentTypeMismatchException.class)
  public ApiResp<String> validateNumberFormatException(HttpServletRequest request,
                                                       MethodArgumentTypeMismatchException exception) {
    String message = exception.getMessage();
    return ApiResp.warning(message);
  }

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

    List<String> errorMsgList = new ArrayList<>();
    List<FieldError> fieldErrors = bindingResult.getFieldErrors();
    for (int i = 0; i < fieldErrors.size(); i++) {
      errorMsgList.add(fieldErrors.get(i).getField() + ": " + fieldErrors.get(i).getDefaultMessage());
    }

    return ApiResp.warning(errorMsgList.toString());
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
  public ApiResp<String> validateException(HttpServletRequest request,
                                           HttpMessageNotReadableException exception) throws Exception {
    String message = exception.getMessage();
        /*Map errorMesssageMap = Maps.newHashMap();
        errorMesssageMap.put(msg, message);*/
    return ApiResp.warning(message);
  }

  /**
   * 上传文件大小判断的异常捕获
   * @param exception
   * @param response
   * @return
   */
  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ApiResp<?> handleMaxSizeException(MaxUploadSizeExceededException exception, HttpServletResponse response) {
    String msg = exception.getMessage();
    return ApiResp.failure("上传文件过大, 最大允许 10MB, " + msg);
  }

  /**
   * 如果底层抛的是这个也可以一起拦
   * @param exception
   * @return
   */
  @ExceptionHandler(SizeLimitExceededException.class)
  public ApiResp<?> handleSizeLimitExceeded(SizeLimitExceededException exception) {
    String msg = exception.getMessage();
    return ApiResp.failure("请求体大小超过限制, " + msg);
  }

//    /**
//     * 目前不生效, 使用AOP解决
//     * 捕捉Controller全局异常
//     * @param req
//     * @param e
//     * @return
//     */
//    @ExceptionHandler(Exception.class)
//    @ResponseBody
//    public ApiResp<String> defaultExceptionHandler(HttpServletRequest req, Exception e) throws Exception {
//        log.error("global exception msg: {}", e.getLocalizedMessage());
//        e.printStackTrace();
//        return ApiResp.error( e.getLocalizedMessage());
//    }
//
//    /**
//     * 目前不生效, 使用AOP解决
//     * 捕捉Controller全局自定义异常
//     * @param req
//     * @param e
//     * @return
//     */
//    @ExceptionHandler(BusinessException.class)
//    @ResponseBody
//    public ApiResp<String> businessExceptionHandler(HttpServletRequest req, BusinessException e) throws Exception {
//        log.warn("business exception msg: {}", e.getLocalizedMessage());
//        return ApiResp.error(e.getReturnCodeEnum().getCode() , e.getReturnCodeEnum().getMessage());
//    }
}