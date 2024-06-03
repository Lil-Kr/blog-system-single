package com.cy.single.blog.pojo.req.blog.content;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
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

  public interface GroupBlogContentSave {}
  public interface GroupBlogContentEdit {}
  public interface GroupBlogContentDelete {}
  public interface GroupBlogContentPublish {}

  @NotNull(groups = {GroupBlogContentEdit.class, GroupBlogContentDelete.class, GroupBlogContentPublish.class}, message = "surrogateId是必须的")
  private Long surrogateId;

//  @NotNull(groups = {GroupBlogContentSave.class}, message = "number是必须的")
//  @Length(groups = {Default.class, GroupBlogContentSave.class}, min=3, max = 20, message = "number长度必须在3~20字之间")
//  private String number;

  @NotNull(groups = {GroupBlogContentSave.class, GroupBlogContentEdit.class}, message = "original是必须的")
  private Integer original;

  @NotNull(groups = {GroupBlogContentSave.class, GroupBlogContentEdit.class}, message = "recommend是必须的")
  private Integer recommend;

  @NotNull(groups = {GroupBlogContentSave.class, GroupBlogContentEdit.class}, message = "title是必须的")
  private String title;

  @NotNull(groups = {GroupBlogContentSave.class, GroupBlogContentEdit.class}, message = "categoryId是必须的")
  private Long categoryId;

  @NotNull(groups = {GroupBlogContentSave.class, GroupBlogContentEdit.class}, message = "labelIds是必须的, 并用多个','分隔")
  private Set<String> labelIds;

//  @NotNull(groups = {GroupBlogContentSave.class}, message = "topicId是必须的")
  private Long topicId;

  private String imgUrl;

  @NotNull(groups = {GroupBlogContentSave.class, GroupBlogContentEdit.class}, message = "contentText是必须的")
  private String contentText;

  @NotNull(groups = {GroupBlogContentPublish.class}, message = "status是必须的")
  @Max(groups = {GroupBlogContentPublish.class}, value = 1, message = "status必须是0或1")
  @Min(groups = {GroupBlogContentPublish.class}, value = 0, message = "status必须是0或1")
  private Integer status;
}