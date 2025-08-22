package com.cy.single.blog.api.test;

import com.alibaba.fastjson2.JSONObject;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.service.SysAclCoreService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/31
 * @Description:
 */
@Slf4j
@RestController
@RequestMapping("/test")
public class TestController {

  @GetMapping("/healthcheck")
  public String healthcheck() {
    return "on";
  }
}