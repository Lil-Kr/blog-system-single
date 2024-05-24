package com.cy.single.blog.pojo.dto.blog;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.blog.BlogCategory;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryReq;
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
public class BlogCategoryDTO {
    /**
     * blog save
     * @param baseReq
     * @param blogCategory
     * @return
     */
    public static BlogCategory convertSaveCategoryReq(BlogCategoryReq baseReq, BlogCategory blogCategory) {
        BeanUtils.copyProperties(baseReq, blogCategory);
        blogCategory.setSurrogateId(IdWorker.getSnowFlakeId());

        Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
        blogCategory.setDeleted(0);
        blogCategory.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
        blogCategory.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());
        blogCategory.setCreateTime(nowDateTime);
        blogCategory.setUpdateTime(nowDateTime);
        return blogCategory;
    }
}

