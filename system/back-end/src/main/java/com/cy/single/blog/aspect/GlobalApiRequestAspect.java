package com.cy.single.blog.aspect;

import com.alibaba.fastjson2.JSONArray;
import com.cy.single.blog.aspect.exceptions.BusinessException;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.enums.ReturnCodeEnum;
import com.cy.single.blog.pojo.entity.sys.SysUser;
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
@Order(2)
public class GlobalApiRequestAspect {

    @Autowired
    private HttpServletRequest servletRequest;

    @Autowired
    private SysUserMapper userMapper;

    @Around("@annotation(com.cy.single.blog.aspect.annotations.CheckAuth)")
    public Object checkAuth(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        try {
            /**
             * get cookie
             */
            Cookie[] cookies = servletRequest.getCookies();
            log.info("cookies:          {}", JSONArray.toJSONString(cookies));

            if (cookies == null) {
                log.error("The request {} headers not exists cookies");
                throw new BusinessException(ReturnCodeEnum.DO_NOT_INJECT);
            }

            String token = Arrays.stream(cookies)
                    .filter(cookie -> "clt".equals(cookie.getName()))
                    .findFirst()
                    .map(Cookie::getValue)
                    .orElse("");

            if (StringUtils.isBlank(token)) {
                log.error("the request have exception:             {}");
                throw new BusinessException("token is null", ReturnCodeEnum.BUSINESS_ERROR);
            }

            /**
             * 先与缓存中对应的用户 token 做校验
             * 如果缓存中没有token 就查询用户在DB中的 token, 并返回
             */
//            Object[] args = proceedingJoinPoint.getArgs();
//            log.info(JSONArray.toJSONString(args));
            SysUser user = userMapper.getUserByToken(token);
            if (Objects.isNull(user)) {
                log.error("The request {} try fake token");
                throw new BusinessException(ReturnCodeEnum.NOT_LOGIN);
            }

            /**
             * record user info into ThreadLocal
             */
            RequestHolder.setHttpServletRequest(servletRequest);
            RequestHolder.setCurrentUser(user);
            Object proceed = proceedingJoinPoint.proceed();

            RequestHolder.remove();
            return proceed;
        }catch (Throwable e) {
            log.error("api request ERROR: {}", e.getMessage());
            Object res = proceedingJoinPoint.proceed();
            RequestHolder.remove();
            return res;
        }
    }
}
