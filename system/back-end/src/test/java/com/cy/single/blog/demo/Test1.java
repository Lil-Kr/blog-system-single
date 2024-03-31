package com.cy.single.blog.demo;

import cn.hutool.core.util.IdUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.cy.single.blog.utils.keyUtil.RunCodeUtil;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.concurrent.TimeUnit;

/**
 * @Author: Lil-K
 * @Date: 2024/3/16
 * @Description:
 */
@Slf4j
public class Test1 {

    @Test
    public void test1() {
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

    @Test
    public void test2() throws InterruptedException {
        Cache<Object, Object> cache = CacheBuilder.newBuilder().expireAfterAccess(100, TimeUnit.MILLISECONDS).build();
        cache.put("k1", "v1");
        cache.put("k2", "v2");

        System.out.println("第一次访问 k2");
        Object k2 = cache.getIfPresent("k2");
        log.info("k2: {}", k2);

        TimeUnit.MILLISECONDS.sleep(1);
        log.info("过3秒之后访问 k2");
        Object k22 = cache.getIfPresent("k2");
        log.info("k2: {}", k22);
    }

    @Test
    public void test3() {
        String uuid1 = IdUtil.randomUUID();
        System.out.println(uuid1);

        String uuid2 = IdUtil.randomUUID();
        System.out.println(uuid2);

        Long id = IdWorker.getSnowFlakeId();
        System.out.println(id);

        String fourPipelineNumbers = RunCodeUtil.getFourPipelineNumbers();

    }

}
