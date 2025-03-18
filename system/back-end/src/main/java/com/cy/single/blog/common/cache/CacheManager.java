package com.cy.single.blog.common.cache;

import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

/**
 * @Author: Lil-K
 * @Date: 2024/3/16
 * @Description: guava cache manage
 */
public class CacheManager {

  private static Cache<String, SysUser> userCache = CacheBuilder.newBuilder().build();

	public static void setUserCache(String token, SysUser user) {
		userCache.put(token, user);
	}

	public static SysUser getUserCache(String key) {
		return userCache.getIfPresent(key);
	}

	public static void removeCache(String key) {
		userCache.invalidate(key);
	}

}