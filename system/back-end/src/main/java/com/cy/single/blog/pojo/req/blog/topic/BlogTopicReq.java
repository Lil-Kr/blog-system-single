package com.cy.single.blog.pojo.req.blog.topic;

import com.cy.single.blog.base.BaseReq;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryReq;
import com.cy.single.blog.pojo.req.blog.label.BlogLabelReq;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;

import static com.cy.single.blog.common.constants.CommonConstants.DEFAULT_COLOR;

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

  @NotNull(groups = {GroupBlogTopicEdit.class, GroupBlogTopicDeleted.class}, message = "surrogateId is require")
  private Long surrogateId;

  /**
   * batch operation
   */
  @NotNull(groups = {BlogLabelReq.GroupLabelDelBatch.class}, message = "surrogateIds cannot be null")
  private List<Long> surrogateIds;

  @NotNull(groups = {GroupBlogTopicSave.class}, message = "topic number cannot be null")
  private String number;

  @NotNull(groups = {GroupBlogTopicEdit.class, GroupBlogTopicSave.class}, message = "blog topic cannot be null")
  @Length(groups = {GroupBlogTopicEdit.class, GroupBlogTopicSave.class}, max = 50, message = "blog topic length must be within 50 characters.")
  private String name;

  @Length(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, max = 50, message = " color is required, Please enter a valid hexadecimal color code.")
  private String color = DEFAULT_COLOR;

  @Length(groups = {Default.class, GroupTopicDelBatch.class}, max = 200, message = "remark length must be within 200 characters.")
  private String remark;

}
