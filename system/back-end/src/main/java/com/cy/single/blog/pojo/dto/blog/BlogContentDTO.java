package com.cy.single.blog.pojo.dto.blog;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.blog.BlogContent;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.cy.single.blog.utils.keyUtil.RunCodeUtil;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
public class BlogContentDTO {

  public static BlogContent convertSaveBlogContentReq(BlogContentReq baseReq) {
    BlogContent blogContent = new BlogContent();
    BeanUtils.copyProperties(baseReq, blogContent);
    blogContent.setSurrogateId(IdWorker.getSnowFlakeId());
    blogContent.setNumber(RunCodeUtil.getFourPipelineNumbers("blog-"));
    blogContent.setDeleted(0);

    blogContent.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
    blogContent.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());
    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    blogContent.setPublishTime(nowDateTime);
    blogContent.setCreateTime(nowDateTime);
    blogContent.setUpdateTime(nowDateTime);

    return blogContent;
  }
}