package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogDiary;
import com.cy.single.blog.pojo.req.blog.diary.DiaryPageListReq;
import com.cy.single.blog.pojo.req.blog.diary.DiarySaveReq;
import com.cy.single.blog.pojo.resp.blog.BlogDiaryPageListResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/5/8
 * @Description:
 */
@Repository
public interface BlogDiaryMapper extends BaseMapper<BlogDiary> {

  List<BlogDiaryPageListResp> pageDiaryList(@Param("param") DiaryPageListReq req);

  Integer countPageDiaryList(@Param("param") DiaryPageListReq req);

  Integer insertSelective(BlogDiary req);
}
