package com.cy.single.blog.pojo.req.blog.topic;

import com.cy.single.blog.base.BaseReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/5/25
 * @Description:
 */
@ToString
@Data
public class BlogTopicReq extends BaseReq {

  public interface GroupBlogTopicSave {}
  public interface GroupBlogTopicEdit {}
  public interface GroupBlogTopicDeleted {}
  public interface GroupTopicDelBatch {}

  @NotNull(groups = {GroupBlogTopicEdit.class, GroupBlogTopicDeleted.class}, message = "surrogateId是必须的")
  private Long surrogateId;

  /**
   * batch operation
   */
  @NotNull(groups = {BlogLabelReq.GroupLabelDelBatch.class}, message = "批量删除surrogateId不能为空")
  private List<Long> surrogateIds;

  @NotNull(groups = {GroupBlogTopicSave.class}, message = "主题编号不能为空")
  private String number;

  @NotNull(groups = {GroupBlogTopicEdit.class, GroupBlogTopicSave.class}, message = "博客主题不能为空")
  @Length(groups = {GroupBlogTopicEdit.class, GroupBlogTopicSave.class}, max = 50, message = "博客主题长度在50个字符以内")
  private String name;

  @Length(groups = {Default.class, GroupTopicDelBatch.class},max = 200, message = "备注长度必须在200个字符以内")
  private String remark;

}
