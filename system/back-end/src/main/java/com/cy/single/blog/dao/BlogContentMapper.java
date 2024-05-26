package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogContent;
import com.cy.single.blog.pojo.req.blog.content.BlogContentPageReq;
import com.cy.single.blog.pojo.vo.blog.BlogContentVO;
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
public interface BlogContentMapper extends BaseMapper<BlogContent> {

  List<BlogContentVO> pageContentList(@Param("param") BlogContentPageReq req);

  List<BlogContentVO> contentList(@Param("param") BlogContentPageReq req);
}