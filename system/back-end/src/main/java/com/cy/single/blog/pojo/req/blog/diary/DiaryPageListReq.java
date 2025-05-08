package com.cy.single.blog.pojo.req.blog.diary;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2025/5/8
 * @Description:
 */
@ToString
@Data
public class DiaryPageListReq extends BasePageReq {

  private static final long serialVersionUID = -2682826241941358753L;
}