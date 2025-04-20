package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogContent;
import com.cy.single.blog.pojo.req.blog.content.BlogContentPageReq;
import com.cy.single.blog.pojo.resp.blog.BlogContentGroupResp;
import com.cy.single.blog.pojo.resp.blog.BlogContentResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
@Repository
public interface BlogContentMapper extends BaseMapper<BlogContent> {

  List<BlogContentResp> pageContentList(@Param("param") BlogContentPageReq req);

  Integer pageContentCount(@Param("param") BlogContentPageReq req);

  List<BlogContentResp> contentList(@Param("param") BlogContentPageReq req);

  Integer updateStatusBySurrogateId(@Param("param") BlogContent req);

  List<BlogContentResp> frontContentList();

  List<BlogContentGroupResp> frontContentByGroupCategory();

  List<BlogContentResp> pageFrontContentList(@Param("param") BlogContentPageReq req);

  Integer pageFrontContentCount(@Param("param") BlogContentPageReq req);
}