package com.cy.single.blog.api;

import com.alibaba.fastjson2.JSONObject;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
@RestController
@RequestMapping("/test")
@Slf4j
public class TestApi {


    @GetMapping("/test1")
    public String test1() {
        SysUser user = RequestHolder.getCurrentUser();
        log.info(JSONObject.toJSONString(user));
        return "abc";
    }

}
