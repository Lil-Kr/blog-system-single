package com.cy.single.blog.common.cache;

import com.cy.single.blog.pojo.entity.blog.BlogCategory;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import com.cy.single.blog.pojo.vo.blog.BlogTopicVO;
import com.cy.single.blog.pojo.vo.image.ImageCategoryVO;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import java.util.*;
import java.util.stream.Collectors;

import static com.cy.single.blog.common.constants.CommonConstants.*;

/**
 * @Author: Lil-K
 * @Date: 2024/3/16
 * @Description: guava cache manage
 */
public class CacheManager {

  /**
   * ====================== blog label cache, long live catch ======================
   */
  private static Cache<String, List<BlogLabelVO>> blogLabelListCache = CacheBuilder.newBuilder().build();
  private static Cache<String, Map<Long, BlogLabelVO>> blogLabelMapCache = CacheBuilder.newBuilder().build();

  public static void setBlogLabelInfoCache(List<BlogLabelVO> blogLabels) {
    blogLabelListCache.put(CACHE_KEY_BLOG_LABEL_LIST, blogLabels);

    Map<Long, BlogLabelVO> labelMap = blogLabels.stream()
      .collect(Collectors.toMap(BlogLabelVO::getSurrogateId, blogLabelVO -> blogLabelVO));
    blogLabelMapCache.put(CACHE_KEY_BLOG_LABEL_MAP, labelMap);
  }

  public static List<BlogLabelVO> getBlogLabelListCache() {
    List<BlogLabelVO> list = blogLabelListCache.getIfPresent(CACHE_KEY_BLOG_LABEL_LIST);
    if (CollectionUtils.isEmpty(list)) {
      return new ArrayList<>();
    }else {
      return list;
    }
  }

  public static Map<Long, BlogLabelVO> getBlogLabelMapCache() {
    return blogLabelMapCache.getIfPresent(CACHE_KEY_BLOG_LABEL_MAP);
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

  public static List<BlogLabelVO> getBlogLabelListCache(String labelIds) {
    if (StringUtils.isBlank(labelIds)) {
      return null;
    }
    List<String> labelIdList = Arrays.asList(labelIds.split(",")).stream()
      .collect(Collectors.toList());

    List<BlogLabelVO> labelVOList = getBlogLabelListCache().stream()
      .filter(item -> labelIdList.contains(item.getSurrogateId().toString()))
      .collect(Collectors.toList());
    return labelVOList;
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

  public static List<BlogLabelVO> removeBlogLabelCache(Long surrogateId) {
    List<BlogLabelVO> blogLabelListCache = getBlogLabelListCache();
    List<BlogLabelVO> collect = blogLabelListCache.stream()
      .filter(item -> !surrogateId.equals(item.getSurrogateId()))
      .collect(Collectors.toList());
    setBlogLabelInfoCache(collect);
    return collect;
  }

  /**
   * ====================== blog category cache, long live catch ======================
   */
  private static Cache<String, List<BlogCategoryVO>> blogCategoryCache = CacheBuilder.newBuilder().build();
  private static Cache<String, Map<Long, BlogCategoryVO>> blogCategoryCacheMap = CacheBuilder.newBuilder().build();

  public static void setBlogCategoryAllListCache(List<BlogCategoryVO> blogCategoryVOList) {
    blogCategoryCache.put(CACHE_KEY_BLOG_CATEGORY_LIST, blogCategoryVOList);
    Map<Long, BlogCategoryVO> map = blogCategoryVOList.stream()
      .collect(Collectors.toMap(BlogCategoryVO::getSurrogateId, blogCategoryVO -> blogCategoryVO));
    blogCategoryCacheMap.put(CACHE_KEY_BLOG_CATEGORY_MAP, map);
  }

  public static List<BlogCategoryVO> getBlogCategoryAllListCache() {
    List<BlogCategoryVO> list = blogCategoryCache.getIfPresent(CACHE_KEY_BLOG_CATEGORY_LIST);
    if (CollectionUtils.isEmpty(list)) {
      return new ArrayList<>();
    }else {
      return list;
    }
  }

  public static Map<Long, BlogCategoryVO> getBlogCategoryAllMapCache() {
    return blogCategoryCacheMap.getIfPresent(CACHE_KEY_BLOG_CATEGORY_MAP);
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


  /**
   * ========================= Blog topic =========================
   */
  private static Cache<String, List<BlogTopicVO>> blogTopicCacheList = CacheBuilder.newBuilder().build();

  private static Cache<String, Map<Long, BlogTopicVO>> blogTopicCacheMap = CacheBuilder.newBuilder().build();

  public static void setBlogTopicInfoCacheList(List<BlogTopicVO> blogTopicVOS) {
    blogTopicCacheList.put(CACHE_KEY_TOPIC_LIST, blogTopicVOS);

    Map<Long, BlogTopicVO> map = blogTopicVOS.stream().collect(Collectors.toMap(BlogTopicVO::getSurrogateId, blogTopicVO -> blogTopicVO));
    blogTopicCacheMap.put(CACHE_KEY_TOPIC_MAP, map);
  }

  public static List<BlogTopicVO> getBlogTopicInfoCacheList() {
    return blogTopicCacheList.getIfPresent(CACHE_KEY_TOPIC_LIST);
  }

  public static Map<Long, BlogTopicVO> getBlogTopicInfoCacheMap() {
    return blogTopicCacheMap.getIfPresent(CACHE_KEY_TOPIC_MAP);
  }

  /**
   * ========================= Image category =========================
   */
  private static Cache<String, List<ImageCategoryVO>> imageCategoryCache = CacheBuilder.newBuilder().build();

  private static Cache<String, Map<Long, String>> imageCategoryCacheMap = CacheBuilder.newBuilder().build();

  public static void setImageCategoryCache(List<ImageCategoryVO> list) {
    imageCategoryCache.put(CACHE_KEY_IMAGE_CATEGORY_LIST, list);

    Map<Long, String> map = list.stream().collect(Collectors.toMap(ImageCategoryVO::getSurrogateId, ImageCategoryVO::getName));
    imageCategoryCacheMap.put(CACHE_KEY_IMAGE_CATEGORY_MAP, map);
  }

  public static List<ImageCategoryVO> getImageCategoryCache() {
    return imageCategoryCache.getIfPresent(CACHE_KEY_IMAGE_CATEGORY_LIST);
  }

  public static Map<Long, String> getImageCategoryCacheMap() {
    return imageCategoryCacheMap.getIfPresent(CACHE_KEY_IMAGE_CATEGORY_MAP);
  }

}