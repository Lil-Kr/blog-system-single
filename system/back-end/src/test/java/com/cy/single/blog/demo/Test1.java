package com.cy.single.blog.demo;

import com.alibaba.fastjson2.JSONArray;
import com.cy.single.blog.common.cache.CacheManager;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
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
        BlogLabelVO blogLabel = new BlogLabelVO();
        blogLabel.setSurrogateId(592255189127168l);
        blogLabel.setName("abc");

        List<BlogLabelVO> blogLabels = new ArrayList<>();
        blogLabels.add(blogLabel);

        CacheManager.setBlogLabelInfoCache(blogLabels);
        log.info("blogLabelListCache1 -> : {}", JSONArray.toJSONString(CacheManager.getBlogLabelListCache()));

        blogLabel.setName("修改Name");
        CacheManager.setBlogLabelCache(blogLabel);
        log.info("blogLabelListCache2 -> : {}", JSONArray.toJSONString(CacheManager.getBlogLabelListCache()));
    }

    @Test
    public void test4() {
        Long snowFlakeId = IdWorker.getSnowFlakeId();
        System.out.println(snowFlakeId);
    }

}
