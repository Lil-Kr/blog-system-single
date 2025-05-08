package com.cy.single.blog.pojo.dto.blog;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.blog.BlogDiary;
import com.cy.single.blog.pojo.req.blog.diary.DiarySaveReq;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2025/5/8
 * @Description:
 */
public class BlogDiaryDTO {

  /**
   * convert req to save
   * @param req
   * @return
   */
  public static BlogDiary convertAddDiaryEntity(DiarySaveReq req) {
    BlogDiary diary = new BlogDiary();
    BeanUtils.copyProperties(req, diary);

    diary.setId(IdWorker.getSnowFlakeId());
    Date nowDateTime = DateUtil.localDateTimeToDate(LocalDateTime.now());
    Long id = RequestHolder.getCurrentUser().getSurrogateId();
    diary.setCreatorId(id);
    diary.setOperator(id);
    diary.setCreateTime(nowDateTime);
    diary.setUpdateTime(nowDateTime);
    return diary;
  }

  public static BlogDiary convertEditDiaryEntity(DiarySaveReq req) {
    BlogDiary diary = new BlogDiary();
    BeanUtils.copyProperties(req, diary);
    diary.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
    diary.setUpdateTime(DateUtil.localDateTimeToDate(LocalDateTime.now()));
    return diary;
  }
}