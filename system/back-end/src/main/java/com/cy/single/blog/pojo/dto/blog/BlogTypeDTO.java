package com.cy.single.blog.pojo.dto.blog;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.blog.BlogType;
import com.cy.single.blog.pojo.req.blog.type.BlogTypeReq;
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
public class BlogTypeDTO {
    /**
     * blog save
     * @param baseReq
     * @param blogType
     * @return
     */
    public static BlogType convertSaveTypeReq(BlogTypeReq baseReq, BlogType blogType) {
        BeanUtils.copyProperties(baseReq, blogType);
        blogType.setSurrogateId(IdWorker.getSnowFlakeId());

        Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
        blogType.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
        blogType.setModifierId(RequestHolder.getCurrentUser().getSurrogateId());
        blogType.setCreateTime(nowDateTime);
        blogType.setUpdateTime(nowDateTime);
        return blogType;
    }
}

