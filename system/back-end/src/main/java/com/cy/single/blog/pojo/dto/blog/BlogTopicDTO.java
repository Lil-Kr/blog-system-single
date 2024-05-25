package com.cy.single.blog.pojo.dto.blog;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.blog.BlogTopic;
import com.cy.single.blog.pojo.req.blog.topic.BlogTopicReq;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2024/4/7
 * @Description:
 */
public class BlogTopicDTO {

  public static BlogTopic convertSaveTopicReq(BlogTopicReq blogTopicReq) {
    BlogTopic blogTopic = BlogTopic.builder().build();
    BeanUtils.copyProperties(blogTopicReq, blogTopic);

    blogTopic.setSurrogateId(IdWorker.getSnowFlakeId());
    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());

    blogTopic.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
    blogTopic.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());
    blogTopic.setCreateTime(nowDateTime);
    blogTopic.setUpdateTime(nowDateTime);

    return blogTopic;
  }

}
