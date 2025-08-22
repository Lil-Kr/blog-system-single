package com.cy.single.blog.pojo.req.blog.content;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.*;
import java.util.List;
import java.util.Set;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
@ToString
@Data
public class BlogContentReq {

  public interface GroupBlogContentAdd {}
  public interface GroupBlogContentEdit {}
  public interface GroupBlogContentDelete {}
  public interface GroupBlogContentPublish {}

  @NotNull(groups = {GroupBlogContentEdit.class, GroupBlogContentDelete.class, GroupBlogContentPublish.class}, message = "blog id is require")
  private Long surrogateId;

  private String introduction;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "original is require")
  @Min(value = 0, message = "original cannot be less than 0.")
  private Long original;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "recommend is require")
  private Long recommend;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "title is require")
  private String title;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "categoryId is require")
  private Long categoryId;

  @NotEmpty(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "labelIds is require")
  private Set<@Pattern(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, regexp = "\\d+", message = "labelId must be Number type")
  @NotBlank(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "labelId is require") String> labelIds;

  private Long topicId;

  private String imgUrl;

  private String paragraph;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "contentText is require")
  private String contentText;

  @NotNull(groups = {GroupBlogContentPublish.class}, message = "status is require")
  private Integer status;
}