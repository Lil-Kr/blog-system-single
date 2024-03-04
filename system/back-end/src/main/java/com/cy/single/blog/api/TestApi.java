package com.cy.single.blog.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
@RestController
@RequestMapping("test")
public class TestApi {

    @GetMapping("test1")
    public String test1() {
        return "abc";
    }

}
