package com.cy.single.blog.utils.strUtil;

import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2022/12/18
 * @Description:
 */
public class PathUtil {

    /**
     * 匹配路径
     */
    private static final PathMatcher pathMatcher = new AntPathMatcher();

    public static boolean matche(String compareUrl, String targetUrl) {
        return pathMatcher.match(compareUrl, targetUrl);
    }

    public static boolean matches(List<String> compareUrls, String targetUrl) {
        return compareUrls.stream()
                .anyMatch(compareUrl -> pathMatcher.match(compareUrl, targetUrl));
    }

}
