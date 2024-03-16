package com.cy.single.blog.demo;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.junit.jupiter.api.Test;

/**
 * @Author: Lil-K
 * @Date: 2024/3/16
 * @Description:
 */
public class Test1 {

    @Test
    public void test1() {
//        Cache<Object, Object> cache = CacheBuilder.newBuilder().expireAfterAccess(2, TimeUnit.MILLISECONDS).build();
        /**
         * LRU cache
         */
        Cache<Object, Object> cache = CacheBuilder.newBuilder().maximumSize(3).build();
        cache.put("key1", "v1");
        cache.put("key2", "v2");
        cache.put("key3", "v3");
        cache.put("key4", "v4");

        System.out.println(cache.getIfPresent("key1"));
        System.out.println(cache.getIfPresent("key4"));
        System.out.println(cache.getIfPresent("key2"));
        System.out.println(cache.getIfPresent("key3"));

    }

}
