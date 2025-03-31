package com.cy.single.blog.common.post;

import com.cy.single.blog.dao.*;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicReq;
import com.cy.single.blog.pojo.resp.blog.BlogCategoryResp;
import com.cy.single.blog.pojo.resp.sys.dic.SysDictDetailResp;
import com.cy.single.blog.service.CacheService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

import static com.cy.single.blog.common.constants.CommonConstants.CACHE_KEY_BLOG_LABEL_LIST;

/**
 * @Author: Lil-K
 * @Date: 2025/3/28
 * @Description: 初始化数据
 */
@Component
public class PostConstructComponent {

	@Autowired
	private CacheService cacheService;

	@Autowired
	private BlogLabelMapper blogLabelMapper;

	@Autowired
	private SysDictMapper dictMapper;

	@Autowired
	private SysDictDetailMapper dictDetailMapper;

	@Autowired
	private BlogCategoryMapper blogCategoryMapper;

	@Autowired
	private BlogTopicMapper blogTopicMapper;

	/**
	 * 初始化:
	 *  - [博客-标签]列表
	 *  - [博客-分类]列表
	 *  - [博客-专题]列表
	 *  - 数据字典信息
	 */
	@PostConstruct
	public void initBlogLabel() {
		// 博客标签数据
		List<BlogLabel> labelList = blogLabelMapper.labelList(new BlogLabelListReq());
		cacheService.saveLabelCache(CACHE_KEY_BLOG_LABEL_LIST, labelList);

		// 博客分类
		List<BlogCategoryResp> blogCategoryList = blogCategoryMapper.categoryList(new BlogCategoryPageReq());
		cacheService.saveBlogCategoryCache(blogCategoryList);

		// 博客专题
		List<BlogTopic> blogTopics = blogTopicMapper.topicList(new BlogTopicReq());
		cacheService.saveBlogTopicCache(blogTopics);

		// 数据字典
		List<SysDict> dictList = dictMapper.selectDictList();
		List<SysDictDetailResp> dictDetailListVO = dictDetailMapper.dictDetailTree();
		List<SysDictDetail> dictDetailList = dictDetailListVO.stream().map(item -> {
			SysDictDetail dictDetail = new SysDictDetail();
			BeanUtils.copyProperties(item, dictDetail);
			return dictDetail;
		}).collect(Collectors.toList());
		cacheService.saveDictDetailCache(dictList, dictDetailList);

	}

}
