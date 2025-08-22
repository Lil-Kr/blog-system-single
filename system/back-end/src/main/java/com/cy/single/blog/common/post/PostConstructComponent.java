package com.cy.single.blog.common.post;

import com.cy.single.blog.dao.*;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.entity.sys.SysUser;
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
  private BlogTopicMapper blogTopicMapper;

  @Autowired
  private BlogLabelMapper blogLabelMapper;

  @Autowired
  private SysDictMapper dictMapper;

  @Autowired
  private SysDictDetailMapper dictDetailMapper;

  @Autowired
  private BlogCategoryMapper blogCategoryMapper;

  @Autowired
  private SysUserMapper userMapper;

  /**
   * 初始化:
   *  - [博客-标签]列表
   *  - [博客-分类]列表
   *  - [博客-专题]列表
   *  - 数据字典信息
   */
  @PostConstruct
  public void initBlogLabel() {
    // cache admin-user data
    List<SysUser> users = userMapper.selectUserAllList();
    cacheService.initUserAdminIdCache(users);

    // cache blog-label data
    List<BlogLabel> labelList = blogLabelMapper.labelList(new BlogLabelListReq());
    cacheService.saveLabelCache(CACHE_KEY_BLOG_LABEL_LIST, labelList);

    // cache blog category
    List<BlogCategoryResp> blogCategoryList = blogCategoryMapper.categoryList(new BlogCategoryPageReq());
    cacheService.saveBlogCategoryCache(blogCategoryList);

    // cache blog topic
    List<BlogTopic> blogTopics = blogTopicMapper.topicList(new BlogTopicReq());
    cacheService.saveBlogTopicCache(blogTopics);

    // cache dict data
    List<SysDict> dictList = dictMapper.selectDictList();
    List<SysDictDetailResp> dictDetailListVO = dictDetailMapper.dictDetailList();
    List<SysDictDetail> dictDetailList = dictDetailListVO.stream().map(item -> {
      SysDictDetail dictDetail = new SysDictDetail();
      BeanUtils.copyProperties(item, dictDetail);
      return dictDetail;
    }).collect(Collectors.toList());
    cacheService.saveDictDetailCache(dictList, dictDetailList);

  }

}
