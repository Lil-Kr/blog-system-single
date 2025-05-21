package com.cy.single.blog.aspect;

import com.cy.single.blog.aspect.exceptions.BusinessException;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.enums.ReturnCodeEnum;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.service.SysAclCoreService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.aspectj.lang.annotation.Around;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import static com.cy.single.blog.enums.ReturnCodeEnum.SYSTEM_ERROR;

/**
 * @Author: Lil-K
 * @Date: 2025/3/29
 * @Description: 权限拦截
 */
@Slf4j
@Component
@Aspect
@Order(3)
public class GlobalAclAspect {

	@Autowired
	private HttpServletRequest servletRequest;

	@Autowired
	private SysAclCoreService coreService;

	@Pointcut("@annotation(com.cy.single.blog.aspect.annotations.CheckAuth)")
	public void acl() {}

	@Around("acl()")
	public Object checkAcl(ProceedingJoinPoint joinPoint) throws Throwable {
		List<SysAcl> userAclList = coreService.getCurrentUserAclList();
		Set<String> urlAclSet = userAclList.stream().map(SysAcl::getUrl).collect(Collectors.toSet());
		try {
			String uri = servletRequest.getRequestURI();
			boolean hasAcl = urlAclSet.stream().anyMatch(item -> item.contains(uri) || uri.startsWith(item));
			if (!hasAcl) {
				log.error("The request is not have acl to call {}", uri);
				throw new BusinessException(ReturnCodeEnum.NO_ACCESS);
			}

//			return joinPoint.proceed();
			Object proceed = joinPoint.proceed();
			return proceed;
		} catch (Throwable e) {
			log.error("api request ACL ERROR: {}", e.getMessage());
			return ApiResp.warning(SYSTEM_ERROR.getCode(), e.getMessage());
		} finally {
			RequestHolder.remove();
		}
	}
}
