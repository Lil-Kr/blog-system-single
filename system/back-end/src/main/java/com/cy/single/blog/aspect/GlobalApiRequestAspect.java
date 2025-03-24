package com.cy.single.blog.aspect;

import com.cy.single.blog.aspect.exceptions.BusinessException;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.enums.ReturnCodeEnum;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

import static com.cy.single.blog.common.cache.CacheManager.getUserCache;
import static com.cy.single.blog.common.cache.CacheManager.setUserCache;
import static com.cy.single.blog.enums.ReturnCodeEnum.SYSTEM_ERROR;

/**
 * @Author: Lil-K
 * @Date: 2024/3/14
 * @Description: api check
 * check token, auth
 */
@Slf4j
@Component
@Aspect
@Order(3)
public class GlobalApiRequestAspect {
	@Autowired
	private HttpServletRequest servletRequest;

	@Autowired
	private SysUserMapper userMapper;

	@Pointcut("@annotation(com.cy.single.blog.aspect.annotations.CheckAuth)")
	public void auth() {}

	//    @Around("@annotation(com.cy.single.blog.aspect.annotations.CheckAuth)")
	@Around("auth()")
	public Object checkAuth(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		try {

			/**
			 * get cookie
			 */
			String token = servletRequest.getHeader("authorization");

			if (StringUtils.isBlank(token)) {
				log.error("the request have exception:             {}");
				throw new BusinessException("token is null", ReturnCodeEnum.BUSINESS_ERROR);
			}

			/**
			 * 先与缓存中对应的用户 token 做校验
			 * 如果缓存中没有token 就查询用户在DB中的 token, 并返回
			 */
			SysUser user = getUserCache(token);
			if (Objects.isNull(user)) {
				user = userMapper.getUserByToken(token);

				if (Objects.isNull(user)) {
					log.error("The request {} try fake token", "ip");
					throw new BusinessException(ReturnCodeEnum.NOT_LOGIN);
				}
				setUserCache(token, user);
			}


			/**
			 * record user info into ThreadLocal
			 */
			RequestHolder.setHttpServletRequest(servletRequest);
			RequestHolder.setCurrentUser(user);
			Object proceed = proceedingJoinPoint.proceed();

			return proceed;
		} catch (Throwable e) {
			log.error("api request ERROR: {}", e.getMessage());
			return ApiResp.warning(SYSTEM_ERROR.getCode(), e.getMessage());
		} finally {
			/**
			 * remove user info
			 */
			RequestHolder.remove();
		}
	}
}
