package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicPageReq;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicReq;
import com.cy.single.blog.pojo.resp.blog.BlogTopicResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Lil-K
 * @since 2024-03-31
 */
@Repository
public interface BlogTopicMapper extends BaseMapper<BlogTopic> {

  List<BlogTopicResp> pageTopicList(@Param("param") BlogTopicPageReq req);

  List<BlogTopic> topicList(@Param("param") BlogTopicReq req);

  BlogTopic selectByNumber(String number);
}