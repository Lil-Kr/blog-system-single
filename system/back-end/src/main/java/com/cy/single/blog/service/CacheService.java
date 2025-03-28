package com.cy.single.blog.service;

import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/28
 * @Description: cache service
 */
public interface CacheService {

	/** ================= blog label ============== **/
	List<BlogLabel> getLabelListCache(String key);

	BlogLabel getLabelCache(Long surrogateId);

	void updateLabelCache(String key, String sign, BlogLabel blogLabel);

	// 刷新缓存
	void saveLabelCache(String key, List<BlogLabel> labelList);

	/**
	 * ================================== dict ===============================
	 **/
	void saveDictDetailCache(List<SysDict> dictVOList, List<SysDictDetail> dictDetailList);

	SysDict getDictCache(Long surrogateId);

	SysDictDetail getDictDetailCache(Long surrogateId);

	void updateDictCache(Long keyDict, SysDict dict, String sign);

	void updateDictDetailCache(Long keyDictDetail, SysDictDetail dictDetail, String sign);

	void removeDicCache(Long key);

	void removeDicDetailCache(Long key);

	/**
	 * ================================== blog category ===============================
	 */
	void saveBlogCategory(List<BlogCategoryVO> categoryList);

	void updateBlogCategory(String key, BlogCategoryVO categoryVO, String sign);

	List<BlogCategoryVO> getBlogCategoryList(String key);

	BlogCategoryVO getBlogCategory(Long surrogateId);
}
