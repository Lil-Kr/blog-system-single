package com.cy.single.blog.api.demo;

import com.alibaba.fastjson2.JSONObject;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.demo.User;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.service.MongoDBService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
@RestController
@RequestMapping("/test")
@Slf4j
public class TestApi {

    @Autowired
    private MongoDBService mongoDBService;

    @GetMapping("/test1")
    public String test1() {
        SysUser user = RequestHolder.getCurrentUser();
        log.info(JSONObject.toJSONString(user));
        return "abc";
    }

    @PostMapping("/saveMongo")
    public User saveMongo(@RequestBody User user) {
        return mongoDBService.save(user);
    }

    @GetMapping("/getMongoById")
    public User getMongoById(@RequestParam("surrogateId") Long surrogateId) {
        User user = mongoDBService.getMongoById(surrogateId);
        return user;
    }
}
