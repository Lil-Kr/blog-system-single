package com.cy.single.blog.aspect;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

/**
 * @Author: Lil-K
 * @Date: 2024/3/14
 * @Description: log record
 */
@Component
@Aspect
@Order(0)
@Slf4j
@Profile({"dev"})
public class GlobalRequestLoggerAspect {

    @Autowired
    private HttpServletRequest servletRequest;

    @Pointcut("@annotation(com.cy.single.blog.aspect.annotations.RecordLogger)")
    public void requestLog() {}

    /**
     * record log for request info
     * @param proceedingJoinPoint
     * @return
     * @throws Throwable
     */
    @Around("requestLog()")
    public Object recordLog(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String url = servletRequest.getRequestURL().toString();
        String reqType = servletRequest.getMethod();
        Object[] args = proceedingJoinPoint.getArgs();
        String apiName = proceedingJoinPoint.getSignature().getName();
        log.info("========================= start =========================");
        log.info("url:              {}", url);
        log.info("request type:     {}", reqType);
        log.info("api name:         {}", apiName);
        log.info("args:             {}", JSONArray.toJSONString(args));

        Instant startTime = Instant.now();

        /** execute point cut **/
        Object resp = proceedingJoinPoint.proceed();

        log.info("resp body:        {}", JSONObject.toJSONString(resp));
        log.info("Time-Consuming:   {}ms", ChronoUnit.MILLIS.between(startTime, Instant.now()));
        log.info("========================= end =========================");
        return resp;
    }
}