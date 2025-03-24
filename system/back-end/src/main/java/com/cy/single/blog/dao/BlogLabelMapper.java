package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelPageReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/24
 * @Description:
 */
public interface BlogLabelMapper extends BaseMapper<BlogLabel> {

	Integer editBySurrogateId(@Param("param") BlogLabelReq req);

	Integer deleteBySurrogateId(Long surrogateId);

	List<BlogLabelVO> getLabelList(@Param("param") BlogLabelListReq req);

	Integer deleteBatch(List<Long> list);

	List<BlogLabelVO> pageList(@Param("param") BlogLabelPageReq req);

	Integer getCountByList(@Param("param") BlogLabelPageReq req);
}
