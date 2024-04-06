package com.cy.single.blog.dao;

import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelListReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelPageReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import com.cy.single.blog.pojo.vo.blog.BlogLabelVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogLabelMapper extends BaseMapper<BlogLabel> {

    Integer editBySurrogateId(@Param("param") BlogLabelReq req);

    Integer deleteBySurrogateId(Long surrogateId);

    List<BlogLabelVO> getLabelList(@Param("param") BlogLabelListReq req);

    Integer deleteBatch(List<Long> list);

    List<BlogLabelVO> pageList(@Param("param") BlogLabelPageReq req);

    Integer getCountByList(@Param("param") BlogLabelPageReq req);
}
