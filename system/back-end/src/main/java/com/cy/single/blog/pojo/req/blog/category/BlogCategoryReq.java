package com.cy.single.blog.pojo.req.blog.category;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;

import static com.cy.single.blog.common.constants.CommonConstants.DEFAULT_COLOR;

/**
 * @Author: Lil-K
 * @Date: 2025/3/30
 * @Description:
 */
@ToString
@Data
public class BlogCategoryReq {

  public interface GroupTypeAdd {}
  public interface GroupTypeEdit {}
  public interface GroupTypeDel {}
  public interface GroupTypeDelBatch {}

  @NotNull(groups = {BlogCategoryReq.GroupTypeEdit.class, BlogCategoryReq.GroupTypeDel.class}, message = "surrogateId is require")
  private Long surrogateId;

  /**
   * batch operation
   */
  @NotBlank(groups = {BlogCategoryReq.GroupTypeDelBatch.class}, message = "surrogateId can not be empty")
  private List<Long> surrogateIds;

  @NotBlank(groups = {BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, message = "number can not be empty")
  private String number;

  @NotBlank(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class}, message = "label name can not be empty")
  @Length(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, max = 50, message = "label type name must be within 50 characters.")
  private String name;

  /**
   * 颜色
   */
  @Length(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, max = 50, message = "Display color is required, Please enter a valid hexadecimal color code.")
  private String color = DEFAULT_COLOR;

  @Length(groups = {Default.class, BlogCategoryReq.GroupTypeAdd.class, BlogCategoryReq.GroupTypeEdit.class}, max = 200, message = "remark must be within 200 characters.")
  private String remark;

  private Integer status;

  private Integer deleted;
}
