package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.diary.DiaryPageListReq;
import com.cy.single.blog.pojo.req.blog.diary.DiarySaveReq;
import com.cy.single.blog.pojo.resp.blog.BlogDiaryPageListResp;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/5/8
 * @Description:
 */
public interface BlogDiaryService {

  PageResult<BlogDiaryPageListResp> pageDiaryList(DiaryPageListReq req);

  ApiResp<String> add(DiarySaveReq diarySaveReq);

  ApiResp<String> edit(DiarySaveReq diarySaveReq);

  ApiResp<String> delete(Long id);
}