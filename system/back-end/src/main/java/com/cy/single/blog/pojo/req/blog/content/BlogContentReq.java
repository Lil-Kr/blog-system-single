package com.cy.single.blog.pojo.req.blog.content;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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

  @NotNull(groups = {GroupBlogContentEdit.class, GroupBlogContentDelete.class, GroupBlogContentPublish.class}, message = "博客id是必须的")
  private Long surrogateId;

  private String introduction;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "original是必须的")
  @Min(value = 0, message = "原创类型")
  private Long original;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "recommend是必须的")
  private Long recommend;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "title是必须的")
  private String title;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "categoryId是必须的")
  private Long categoryId;

  @NotEmpty(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "labelIds是必须的")
  private Set<Long> labelIds;

  private Long topicId;

  private String imgUrl;

  @NotNull(groups = {GroupBlogContentAdd.class, GroupBlogContentEdit.class}, message = "contentText是必须的")
  private String contentText;

  @NotNull(groups = {GroupBlogContentPublish.class}, message = "status是必须的")
  private Integer status;
}