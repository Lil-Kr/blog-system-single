package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelPageReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import com.cy.single.blog.pojo.resp.blog.BlogLabelResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/24
 * @Description:
 */
@Repository
public interface BlogLabelMapper extends BaseMapper<BlogLabel> {

	Integer editBySurrogateId(@Param("param") BlogLabelReq req);

	Integer deleteBySurrogateId(Long surrogateId);

	List<BlogLabel> labelList(@Param("param") BlogLabelListReq req);

	Integer deleteBatch(List<Long> list);

	List<BlogLabelResp> pageList(@Param("param") BlogLabelPageReq req);

	Integer getCountByList(@Param("param") BlogLabelPageReq req);
}
