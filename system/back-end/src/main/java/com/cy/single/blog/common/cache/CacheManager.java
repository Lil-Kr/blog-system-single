package com.cy.single.blog.common.cache;

import com.cy.single.blog.pojo.entity.blog.BlogCategory;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.cy.single.blog.common.constants.CommonConstants.CACHE_KEY_BLOG_CATEGORY_LIST;
import static com.cy.single.blog.common.constants.CommonConstants.CACHE_KEY_BLOG_LABEL_LIST;

/**
 * @Author: Lil-K
 * @Date: 2024/3/16
 * @Description: guava cache manage
 */
public class CacheManager {

  /**
   * ====================== blog label cache, long live catch ======================
   */
  private static final Cache<String, List<BlogLabelVO>> blogLabelCache = CacheBuilder.newBuilder().build();

  /**
   * ====================== blog label cache, long live catch ======================
   */
  private static final Cache<String, List<BlogCategoryVO>> blogCategoryCache = CacheBuilder.newBuilder().build();

  public static void setBlogLabelListCache(List<BlogLabelVO> blogLabels) {
    blogLabelCache.put(CACHE_KEY_BLOG_LABEL_LIST, blogLabels);
  }

  public static List<BlogLabelVO> getBlogLabelListCache() {
    List<BlogLabelVO> list = blogLabelCache.getIfPresent(CACHE_KEY_BLOG_LABEL_LIST);
    if (CollectionUtils.isEmpty(list)) {
      return new ArrayList<>();
    }else {
      return list;
    }
  }

  public static List<String> getBlogLabelNameListCache(String labelIds) {
    if (StringUtils.isBlank(labelIds)) {
      return null;
    }
    List<String> labelIdList = Arrays.asList(labelIds.split(",")).stream()
      .collect(Collectors.toList());

    List<String> res = getBlogLabelListCache().stream()
      .filter(item -> labelIdList.contains(item.getSurrogateId().toString()))
      .map(item -> item.getName())
      .collect(Collectors.toList());
    return res;
  }

  public static void setBlogLabelCache(BlogLabel blogLabel) {
    List<BlogLabelVO> blogLabelListCache = getBlogLabelListCache();
    blogLabelListCache.stream()
      .filter(item -> blogLabel.getSurrogateId().equals(item.getSurrogateId()))
      .findFirst()
      .ifPresent(item -> {
        BeanUtils.copyProperties(blogLabel, item);
      });
  }


  /**
   * ====================== blog category cache, long live catch ======================
   */
  public static void setBlogCategoryAllListCache(List<BlogCategoryVO> blogCategoryVOList) {
    blogCategoryCache.put(CACHE_KEY_BLOG_CATEGORY_LIST, blogCategoryVOList);
  }

  public static List<BlogCategoryVO> getBlogCategoryAllListCache() {
    List<BlogCategoryVO> list = blogCategoryCache.getIfPresent(CACHE_KEY_BLOG_CATEGORY_LIST);
    if (CollectionUtils.isEmpty(list)) {
      return new ArrayList<>();
    }else {
      return list;
    }
  }

  public static BlogCategoryVO getBlogCategoryCache(Long surrogateId) {
    List<BlogCategoryVO> blogCategoryAllListCache = getBlogCategoryAllListCache();
    return blogCategoryAllListCache.stream()
      .filter(item -> item.getSurrogateId().equals(surrogateId))
      .findFirst()
      .orElse(null);
  }


  public static void setBlogCategoryCache(BlogCategory blogCategory) {
    List<BlogCategoryVO> blogCategoryAllListCache = getBlogCategoryAllListCache();

    blogCategoryAllListCache.stream()
      .filter(item -> blogCategory.getSurrogateId().equals(item.getSurrogateId()))
      .findFirst()
      .ifPresent(item -> {
        BeanUtils.copyProperties(blogCategory, item);
      });
  }

}