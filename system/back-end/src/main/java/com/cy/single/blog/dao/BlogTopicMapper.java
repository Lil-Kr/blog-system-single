package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicPageReq;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicReq;
import com.cy.single.blog.pojo.vo.blog.BlogTopicVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogTopicMapper extends BaseMapper<BlogTopic> {

  List<BlogTopicVO> pageTopicList(@Param("param") BlogTopicPageReq req);

  List<BlogTopicVO> topicList(@Param("param") BlogTopicReq req);

  BlogTopic selectByNumber(String number);
}