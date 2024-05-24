package com.cy.single.blog.pojo.req.blog.content;

import com.cy.single.blog.base.BaseEntity;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/5/24
 * @Description:
 */
@ToString
@Data
public class BlogContentReq extends BaseEntity {

  public interface GroupBlogContentSave {}
  public interface GroupBlogContentEdit {}
  public interface GroupBlogContentDelete {}

  @NotNull(groups = {GroupBlogContentEdit.class, GroupBlogContentDelete.class}, message = "surrogateId是必须的")
  private Long surrogateId;

//  @NotNull(groups = {GroupBlogContentSave.class}, message = "number是必须的")
//  @Length(groups = {Default.class, GroupBlogContentSave.class}, min=3, max = 20, message = "number长度必须在3~20字之间")
//  private String number;

  @NotNull(groups = {GroupBlogContentSave.class}, message = "original是必须的")
  private Integer original;

  @NotNull(groups = {GroupBlogContentSave.class}, message = "recommend是必须的")
  private Integer recommend;

  @NotNull(groups = {GroupBlogContentSave.class}, message = "title是必须的")
  private String title;

  @NotNull(groups = {GroupBlogContentSave.class}, message = "categoryId是必须的")
  private Long categoryId;

  @NotNull(groups = {GroupBlogContentSave.class}, message = "labelIds是必须的")
  private List<String> labelIds;

//  @NotNull(groups = {GroupBlogContentSave.class}, message = "topicId是必须的")
  private Long topicId;

  @NotNull(groups = {GroupBlogContentSave.class}, message = "contentText是必须的")
  private String contentText;
}