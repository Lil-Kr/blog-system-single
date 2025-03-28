package com.cy.single.blog.service.impl;

import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;
import com.cy.single.blog.service.CacheService;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.springframework.stereotype.Service;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.cy.single.blog.common.constants.CommonConstants.*;

/**
 * @Author: Lil-K
 * @Date: 2025/3/28
 * @Description:
 */
@Service
public class CacheServiceImpl implements CacheService, Serializable {

	private static final long serialVersionUID = -3794279386684757741L;

	/**
	 * blog-label cache
	 */
	private static Cache<String, List<BlogLabel>> blogLabelListCache = CacheBuilder.newBuilder().build();
	private static Cache<Long, BlogLabel> blogLabelCache = CacheBuilder.newBuilder().build();

	/**
	 * 获取 label list
	 * @param key
	 * @return
	 */
	@Override
	public List<BlogLabel> getLabelListCache(String key) {
		return blogLabelListCache.getIfPresent(key);
	}

	/**
	 * 获取单条 label
	 * @param surrogateId
	 * @return
	 */
	@Override
	public BlogLabel getLabelCache(Long surrogateId) {
		return blogLabelCache.getIfPresent(surrogateId);
	}

	/**
	 * 刷新缓存
	 * @param key
	 */
	@Override
	public void updateLabelCache(String key, String sign, BlogLabel blogLabel) {
		// create
		if (sign.equals(BUS_CREATE)) {
			// 更新 list
			List<BlogLabel> cacheList = blogLabelListCache.getIfPresent(key);
			cacheList.add(blogLabel);
			blogLabelListCache.put(key, cacheList);

			// 更新 object
			blogLabelCache.put(blogLabel.getSurrogateId(), blogLabel);
		} else if (sign.equals(BUS_EDIT)) { // edit
			// 更新 list
			List<BlogLabel> cacheList = blogLabelListCache.getIfPresent(key);
			List<BlogLabel> newCacheList = cacheList.stream()
				.map(item -> Objects.equals(item.getSurrogateId(), blogLabel.getSurrogateId()) ? blogLabel : item)
				.collect(Collectors.toList());
			blogLabelListCache.put(key, newCacheList);

			// 更新 object
			blogLabelCache.put(blogLabel.getSurrogateId(), blogLabel);
		}
	}

	/**
	 * 保存缓存
	 * @param key
	 * @param labelList
	 */
	@Override
	public void saveLabelCache(String key, List<BlogLabel> labelList) {
		// 重置list缓存
		blogLabelListCache.put(key, labelList);

		// 重置object缓存
		labelList.forEach(item -> blogLabelCache.put(item.getSurrogateId(), item));
	}

	/**
	 * ========================== dict cache ==========================
	 */
	private static Cache<Long, SysDict> dictCache = CacheBuilder.newBuilder().build();
	private static Cache<Long, SysDictDetail> dictDetailCache = CacheBuilder.newBuilder().build();

	@Override
	public void saveDictDetailCache(List<SysDict> dictList, List<SysDictDetail> dictDetailList) {
		// 初始化数据字典主表
		dictList.parallelStream().forEach(item -> dictCache.put(item.getSurrogateId(), item));

		// 初始化数据字典明细表
		dictDetailList.parallelStream().forEach(item -> dictDetailCache.put(item.getSurrogateId(), item));
	}

	@Override
	public SysDict getDictCache(Long surrogateId) {
		return dictCache.getIfPresent(surrogateId);
	}

	@Override
	public SysDictDetail getDictDetailCache(Long surrogateId) {
		return dictDetailCache.getIfPresent(surrogateId);
	}

	@Override
	public void updateDictCache(Long keyDict, SysDict dict, String sign) {
		dictCache.put(keyDict, dict);
	}

	@Override
	public void updateDictDetailCache(Long keyDictDetail, SysDictDetail dictDetail, String sign) {
		dictDetailCache.put(keyDictDetail, dictDetail);
	}

	@Override
	public void removeDicCache(Long key) {
		dictCache.invalidate(key);
	}

	@Override
	public void removeDicDetailCache(Long key) {
		dictDetailCache.invalidate(key);
	}

	/**
	 * ================================== blog category ===============================
	 */
	private static Cache<Long, BlogCategoryVO> categoryCache = CacheBuilder.newBuilder().build();
	private static Cache<String, List<BlogCategoryVO>> categoryListCache = CacheBuilder.newBuilder().build();

	/**
	 * 初始化, 保存 category 数据
	 * @param categoryList
	 */
	@Override
	public void saveBlogCategory(List<BlogCategoryVO> categoryList) {
		categoryList.forEach(item -> categoryCache.put(item.getSurrogateId(), item));
		categoryListCache.put(CACHE_KEY_BLOG_CATEGORY_LIST, categoryList);
	}

	@Override
	public void updateBlogCategory(String key, BlogCategoryVO categoryVO, String sign) {
		if (BUS_CREATE.equals(sign)) {
			List<BlogCategoryVO> newList = categoryListCache.getIfPresent(key);
			newList.add(categoryVO);
			categoryListCache.put(key, newList);

			categoryCache.put(categoryVO.getSurrogateId(), categoryVO);
		} else if (BUS_EDIT.equals(sign)) {
			List<BlogCategoryVO> newList = categoryListCache.getIfPresent(key);
			List<BlogCategoryVO> collect = newList.stream()
				.map(item -> item.getSurrogateId().equals(categoryVO.getSurrogateId()) ? categoryVO : item)
				.collect(Collectors.toList());
			categoryListCache.put(key, collect);

			categoryCache.put(categoryVO.getSurrogateId(), categoryVO);
		} else if (BUS_DELETE.equals(sign)) {
			List<BlogCategoryVO> newList = categoryListCache.getIfPresent(key);
			List<BlogCategoryVO> collect = newList.stream()
				.filter(item -> !item.getSurrogateId().equals(categoryVO.getSurrogateId()))
				.collect(Collectors.toList());
			categoryListCache.put(key, collect);

			categoryCache.invalidate(categoryVO.getSurrogateId());
		} else { // BUS_DELETE_BATCH
//			List<BlogCategoryVO> newList = categoryListCache.getIfPresent(key);
//			List<Long> surrogateIds = categoryVO.getSurrogateIds();
//			List<BlogCategoryVO> collect = newList.stream()
//				.filter(item -> !surrogateIds.contains(item.getSurrogateId()))
//				.collect(Collectors.toList());
//			categoryListCache.put(key, collect);
//
		}
	}

	@Override
	public List<BlogCategoryVO> getBlogCategoryList(String key) {
		return categoryListCache.getIfPresent(key);
	}

	@Override
	public BlogCategoryVO getBlogCategory(Long surrogateId) {
		return categoryCache.getIfPresent(surrogateId);
	}


}
