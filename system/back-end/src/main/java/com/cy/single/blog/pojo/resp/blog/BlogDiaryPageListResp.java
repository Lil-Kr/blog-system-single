package com.cy.single.blog.pojo.resp.blog;

import com.cy.single.blog.pojo.entity.blog.BlogDiary;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2025/5/8
 * @Description:
 */
@ToString
@Data
public class BlogDiaryPageListResp extends BlogDiary {
  private static final long serialVersionUID = -1582450689632298196L;

  private String creatorName;
  private String operatorName;
}
