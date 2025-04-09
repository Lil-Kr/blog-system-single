package com.cy.single.blog.pojo.dto.blog;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.blog.BlogCategory;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryReq;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Date;

import static com.cy.single.blog.common.constants.CommonConstants.DEFAULT_COLOR;

/**
 * @Author: Lil-K
 * @Date: 2024/4/7
 * @Description:
 */
public class BlogCategoryDTO {
  /**
   * blog save
   * @param req
   * @param blogCategory
   * @return
   */
  public static BlogCategory convertSaveCategoryReq(BlogCategoryReq req, BlogCategory blogCategory) {
    BeanUtils.copyProperties(req, blogCategory);
    blogCategory.setSurrogateId(IdWorker.getSnowFlakeId());

    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    blogCategory.setStatus(0);
    blogCategory.setColor(StringUtils.isBlank(req.getColor()) ? DEFAULT_COLOR : req.getColor());
    blogCategory.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
    blogCategory.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
    blogCategory.setCreateTime(nowDateTime);
    blogCategory.setUpdateTime(nowDateTime);
    return blogCategory;
  }
}

