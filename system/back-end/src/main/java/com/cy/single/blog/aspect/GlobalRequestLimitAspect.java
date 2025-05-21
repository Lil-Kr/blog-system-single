package com.cy.single.blog.aspect;

import com.cy.single.blog.aspect.exceptions.BusinessException;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.enums.ReturnCodeEnum;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.common.util.concurrent.RateLimiter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * @Author: Lil-K
 * @Date: 2024/3/21
 * @Description: qpi rate limit
 *
 * rate limit rule:
 *  1. admin api
 *    * which adminUser just to call api once in 50ms
 *    * key: [account + _ + apiName]
 *    * key expire: 50ms
 *  2. front website
 *    * which request just to call api twice in 50ms
 *    * key: [ip]
 */
@Slf4j
@Component
@Aspect
@Order(2)
public class GlobalRequestLimitAspect {

  @Autowired
  private HttpServletRequest servletRequest;

  /**
   * not business api rule
   */
  private static Set<String> methodNotBusiness = Sets.newHashSet("login", "register", "logout", "healthcheck");

  /**
   * request limit by minutes
   */
  private static Cache<String, Boolean> apiRateLimiterAdminNotBusiness = CacheBuilder.newBuilder().expireAfterWrite(1500, TimeUnit.MILLISECONDS).maximumSize(50_000).build();
  private static Cache<String, Boolean> apiRateLimiterAdmin = CacheBuilder.newBuilder().expireAfterWrite(50, TimeUnit.MILLISECONDS).maximumSize(10_000).build();
  private static Cache<String, Object> apiRateLimiterFront = CacheBuilder.newBuilder().expireAfterAccess(2, TimeUnit.MINUTES).build();

//  @Around("execution(* com.cy.single.blog.api.*..*.*(..))")
  public Object requestLimit(ProceedingJoinPoint joinPoint) throws Throwable {
    // get method name
    String methodName = joinPoint.getSignature().getName();

    if (StringUtils.isBlank(methodName)) {
      throw new BusinessException(ReturnCodeEnum.DO_NOT_INJECT);
    }

    /**
     * limit for not business api
     */
    if (methodNotBusiness.contains(methodName)) {
      return rateLimiterAdminNotBusiness(joinPoint);
    }

    /**
     * limit for website and admin system api
     */
    if (methodName.startsWith("front")) {
      // front api limit rule
      return rateLLimiterFront(joinPoint, "");
    } else {
      // admin api limit rule
//      return rateLLimiterAdmin(joinPoint, RequestHolder.getCurrentUser().getAccount(), methodName);
      return joinPoint.proceed();
    }
  }

  /**
   * handle not business api rate limit
   * @param joinPoint
   * @return
   * @throws Throwable
   */
  private Object rateLimiterAdminNotBusiness (ProceedingJoinPoint joinPoint) throws Throwable {
    String key = "ip";
    if (apiRateLimiterAdminNotBusiness.getIfPresent(key) != null) {
      log.warn("too many request, access denied");
      throw new BusinessException(ReturnCodeEnum.TOO_MANY_REQUEST);
    }
    apiRateLimiterAdminNotBusiness.put(key, true);
    return joinPoint.proceed();
  }

  /**
   * handle admin system api rate limit
   * @param joinPoint
   * @return
   * @throws Throwable
   */
  private Object rateLLimiterAdmin (ProceedingJoinPoint joinPoint, String account, String methodName) throws Throwable {
    StringBuffer key = new StringBuffer(account).append("_").append(methodName);
    if (apiRateLimiterAdmin.getIfPresent(key) != null) {
      log.warn("too many request, access denied");
      throw new BusinessException(ReturnCodeEnum.TOO_MANY_REQUEST);
    }
    apiRateLimiterAdmin.put(key.toString(), true);
    return joinPoint.proceed();
  }

  /**
   * handle front api rate limit
   * @param joinPoint
   * @return
   * @throws Throwable
   */
  private Object rateLLimiterFront (ProceedingJoinPoint joinPoint, String ip) throws Throwable {

    return joinPoint.proceed();
  }
}
