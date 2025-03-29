package com.cy.single.blog.aspect;

import com.cy.single.blog.service.SysAclCoreService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * @Author: Lil-K
 * @Date: 2025/3/29
 * @Description: 权限拦截
 */
@Slf4j
@Component
@Aspect
@Order(3)
public class GlobalUserAclAspect {

	@Autowired
	private SysAclCoreService coreService;

}
