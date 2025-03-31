package com.cy.single.blog.pojo.dto.blog;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import com.cy.single.blog.pojo.resp.blog.BlogLabelResp;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
public class BlogLabelDTO {

    /** ======================= blog-label  ======================= **/
    public static BlogLabel convertSaveLabelReq(BlogLabelReq baseReq) {
        com.cy.single.blog.pojo.entity.blog.BlogLabel req = new com.cy.single.blog.pojo.entity.blog.BlogLabel();
        BeanUtils.copyProperties(baseReq, req);

        req.setSurrogateId(IdWorker.getSnowFlakeId());
        Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());

        req.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
        req.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
        req.setCreateTime(nowDateTime);
        req.setUpdateTime(nowDateTime);
        return req;
    }

    public static BlogLabel convertEditLabelReq(BlogLabelReq baseReq) {
        com.cy.single.blog.pojo.entity.blog.BlogLabel req = new com.cy.single.blog.pojo.entity.blog.BlogLabel();
        BeanUtils.copyProperties(baseReq, req);

        Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
        req.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
        req.setUpdateTime(nowDateTime);
        return req;
    }


    public static BlogLabel convertDelLabelReq(BlogLabelReq baseReq) {
        com.cy.single.blog.pojo.entity.blog.BlogLabel req = new com.cy.single.blog.pojo.entity.blog.BlogLabel();
        BeanUtils.copyProperties(baseReq, req);
        return req;
    }

    public static BlogLabel convertQueryLabelReq(BlogLabelListReq baseReq) {
        com.cy.single.blog.pojo.entity.blog.BlogLabel req = new com.cy.single.blog.pojo.entity.blog.BlogLabel();
        BeanUtils.copyProperties(baseReq, req);
        return req;
    }

    /**
     *
     * @param blogLabels
     * @return
     */
    public static List<BlogLabelResp> convertLabelsToVO(List<com.cy.single.blog.pojo.entity.blog.BlogLabel> blogLabels) {
        return blogLabels.stream()
                .map(blogLabel -> {
                    BlogLabelResp req = new BlogLabelResp();
                    BeanUtils.copyProperties(blogLabel, req);
                    return req;
                })
                .collect(Collectors.toList());
    }

    /** ======================= blog-topic  ======================= **/
}
