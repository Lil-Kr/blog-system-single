package com.cy.single.blog.aspect;

import com.alibaba.fastjson2.JSONArray;
import com.cy.single.blog.aspect.exceptions.BusinessException;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.enums.ReturnCodeEnum;
import com.cy.single.blog.pojo.entity.SysUser;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Objects;

/**
 * @Author: Lil-K
 * @Date: 2024/3/14
 * @Description: api check
 * check token, auth
 */
@Slf4j
@Component
@Aspect
@Order(1)
public class GlobalApiRequestAspect {

    @Autowired
    private HttpServletRequest servletRequest;

    @Autowired
    private SysUserMapper userMapper;

    @Order(0)
    @Around("execution(* com.cy.single.blog.api..*.*(..))")
    public Object checkToken(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Cookie[] cookies = servletRequest.getCookies();
        log.info("cookies:          {}", JSONArray.toJSONString(cookies));

        String token = Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals("token"))
                .findFirst()
                .map(Cookie::getValue)
                .orElse("");

        if (StringUtils.isEmpty(token)) {
            log.error("the request have exception:             {}");
            throw new BusinessException("token is null", ReturnCodeEnum.BUSINESS_ERROR);
        }

        /**
         * todo:
         * 先与缓存中对应的用户 token 做校验,
         * 如果缓存中没有token 就查询用户在DB中的token, 并返回
         */
        SysUser user = userMapper.getUserByToken(token);
        if (Objects.isNull(user)) {
            log.error("the request ");
        }


        return proceedingJoinPoint.proceed();
    }

    /**
     * no check auth for api
     * @param proceedingJoinPoint
     * @return
     * @throws Throwable
     */
    @Order(1)
    @Around("@annotation(com.cy.single.blog.aspect.annotations.NoCheckAuth)")
    public Object noCheckAuth(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        return proceedingJoinPoint.proceed();
    }

//    /**
//     * TODO need check auth
//     * need check auth for api
//     * @param proceedingJoinPoint
//     * @return
//     * @throws Throwable
//     */
//    @Order(2)
//    @Around("execution(* com.cy.single.blog.api..*.*(..))")
//    public Object checkAuth(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
//        // TODO 需要鉴权
//        return proceedingJoinPoint.proceed();
//    }
}
