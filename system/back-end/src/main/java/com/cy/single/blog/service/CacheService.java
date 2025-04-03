package com.cy.single.blog.service;

import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.resp.blog.BlogCategoryResp;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/28
 * @Description: cache service
 */
public interface CacheService {

	/** ================= admin cache ============== **/
	void setUserCache(String token, SysUser user);

	SysUser getUserCache(String key);

	void removeCache(String key);

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
	void saveBlogCategoryCache(List<BlogCategoryResp> categoryList);

	void updateBlogCategoryCache(String key, BlogCategoryResp categoryVO, String sign);

	List<BlogCategoryResp> getBlogCategoryListCache(String key);

	BlogCategoryResp getBlogCategoryCache(Long surrogateId);

	/**
	 * ================================== blog topic ===============================
	 */
	void saveBlogTopicCache(List<BlogTopic> list);

	void updateBlogTopicCache(String key, BlogTopic topic, String sign, Long delId);

	BlogTopic getTopicCache(Long surrogateId);

	List<BlogTopic> getTopicListCache(String key);

	/**
	 * ================================== sys admin-user acl ===============================
	 */
	void saveUserAclCache(Long surrogateId, List<SysAcl> aclList);

	List<SysAcl> getUserAclListCache(Long userId);

	void invalidUserAclCache(List<Long> userIdList);

	void invalidAllUserAclCache();
}
