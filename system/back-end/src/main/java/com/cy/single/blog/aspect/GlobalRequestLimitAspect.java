package com.cy.single.blog.aspect;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/**
 * @Author: Lil-K
 * @Date: 2024/3/21
 * @Description: api request limit
 */
@Slf4j
@Component
@Aspect
@Order(1)
public class GlobalRequestLimitAspect {

    /**
     * request limit by minutes
     */
    Cache<Object, Object> requestLimit = CacheBuilder.newBuilder().expireAfterAccess(2, TimeUnit.MINUTES).build();

    /*@Around("execution(* com.cy.single.blog.api.*.controller..*.*(..))")
    public Object requestLimit(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

        return proceedingJoinPoint.proceed();
    }*/
}
