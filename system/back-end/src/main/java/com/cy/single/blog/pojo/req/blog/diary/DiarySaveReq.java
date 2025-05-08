package com.cy.single.blog.pojo.req.blog.diary;

import com.cy.single.blog.pojo.req.sys.aclmodule.AclModuleReq;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2025/5/8
 * @Description:
 */
@ToString
@Data
public class DiarySaveReq {

  public interface GroupAdd {}
  public interface GroupEdit {}

  @NotNull(groups = {GroupEdit.class}, message = "id cant not be null")
  private Long id;

  @NotBlank(groups = {GroupAdd.class, GroupEdit.class}, message = "title cant not be blank")
  @Length(min = 1, max = 100, message = "title length must be between 1 and 100", groups = {GroupAdd.class, GroupEdit.class})
  private String title;

  @NotBlank(groups = {GroupAdd.class, GroupEdit.class}, message = "content cant not be blank")
  @Length(min = 1, max = 400, message = "content length must be between 1 and 400", groups = {GroupAdd.class, GroupEdit.class})
  private String content;
}