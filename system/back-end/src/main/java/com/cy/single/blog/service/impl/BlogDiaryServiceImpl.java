package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.dao.BlogDiaryMapper;
import com.cy.single.blog.pojo.dto.blog.BlogDiaryDTO;
import com.cy.single.blog.pojo.entity.blog.BlogDiary;
import com.cy.single.blog.pojo.req.blog.diary.DiaryPageListReq;
import com.cy.single.blog.pojo.req.blog.diary.DiarySaveReq;
import com.cy.single.blog.pojo.resp.blog.BlogDiaryPageListResp;
import com.cy.single.blog.service.BlogDiaryService;
import com.cy.single.blog.service.CacheService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2025/5/8
 * @Description:
 */
@Service
@Slf4j
public class BlogDiaryServiceImpl implements BlogDiaryService {

  @Autowired
  private BlogDiaryMapper diaryMapper;

  @Autowired
  private CacheService cacheService;

  @Override
  public PageResult<BlogDiaryPageListResp> pageDiaryList(DiaryPageListReq req) {
    List<BlogDiaryPageListResp> pageList = diaryMapper.pageDiaryList(req);
    pageList.forEach(diary -> {
      diary.setCreatorName(cacheService.getUserAdminIdCache(diary.getCreatorId()).getAccount());
      diary.setOperatorName(cacheService.getUserAdminIdCache(diary.getCreatorId()).getAccount());
    });
    Integer count = diaryMapper.countPageDiaryList(req);

    if (CollectionUtils.isEmpty(pageList)) {
      return new PageResult<>(new ArrayList<>(0), 0);
    }
    return new PageResult<>(pageList, count);
  }

  @Override
  public ApiResp<String> add(DiarySaveReq req) {
    BlogDiary diary = BlogDiaryDTO.convertAddDiaryEntity(req);

    int insert = diaryMapper.insertSelective(diary);
    if (insert < 1) {
      return ApiResp.failure(Add_ERROR);
    }
    return ApiResp.success();
  }

  @Override
  public ApiResp<String> edit(DiarySaveReq req) {
    BlogDiary diary = BlogDiaryDTO.convertEditDiaryEntity(req);

    int update = diaryMapper.updateById(diary);
    if (update < 1) {
      return ApiResp.failure(EDITE_ERROR);
    }
    return ApiResp.success();
  }

  @Override
  public ApiResp<String> delete(Long id) {
    int del = diaryMapper.deleteById(id);
    if (del < 1) {
      return ApiResp.failure(DEL_ERROR);
    }
    return ApiResp.success();
  }
}
