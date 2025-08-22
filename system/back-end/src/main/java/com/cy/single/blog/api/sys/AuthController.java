package com.cy.single.blog.api.sys;

import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.service.SysPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @Author: Lil-K
 * @Date: 2025/3/16
 * @Description: auth for user-admin api
 */
@RestController
@RequestMapping("/sys/auth")
public class AuthController {

  @Autowired
  private SysPermissionService permissionService;

  /**
   * current user-admin has menu and button permission
   * @return
   */
  @CheckAuth
  @RecordLogger
  @GetMapping("/permission")
  public ApiResp<Map<String, Object>> permission() {
    return permissionService.permission();
  }
}