package com.cy.single.blog.dao;

import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.req.blog.BlogLabelReq;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogLabelMapper extends BaseMapper<BlogLabel> {

    Integer editById(@Param("param") BlogLabelReq req);

    Integer delete(@Param("param") BlogLabelReq req);

}
