package com.cy.single.blog.pojo.dto.blog;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.blog.BlogContent;
import com.cy.single.blog.pojo.req.blog.content.BlogContentReq;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.cy.single.blog.utils.keyUtil.RunCodeUtil;
import net.sf.jsqlparser.expression.operators.relational.OldOracleJoinBinaryExpression;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
public class BlogContentDTO {

  public static BlogContent convertAddBlogContentReq(BlogContentReq baseReq) {
    BlogContent blogContent = new BlogContent();
    BeanUtils.copyProperties(baseReq, blogContent);
    blogContent.setSurrogateId(IdWorker.getSnowFlakeId());
    blogContent.setNumber(RunCodeUtil.getFourPipelineNumbers("blog-"));
    blogContent.setLabelIds(convertBlogLabelToString(baseReq.getLabelIds()));
    blogContent.setDeleted(0);

    blogContent.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
    blogContent.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    blogContent.setPublishTime(nowDateTime);
    blogContent.setCreateTime(nowDateTime);
    blogContent.setUpdateTime(nowDateTime);

    return blogContent;
  }

  public static String convertBlogLabelToString(Set<String> labelIds) {
    return labelIds.stream().filter(Objects::nonNull)
      .distinct() // remove duplicate label
      .map(String::valueOf)
      .collect(Collectors.joining(","));
  }



}