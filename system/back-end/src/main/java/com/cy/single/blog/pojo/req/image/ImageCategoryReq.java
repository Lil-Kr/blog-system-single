package com.cy.single.blog.pojo.req.image;

import com.cy.single.blog.base.BaseEntity;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
@ToString
@Data
public class ImageCategoryReq extends BaseEntity {

  public interface GroupImageCategoryAdd {}
  public interface GroupImageCategoryEdit {}
  public interface GroupImageCategoryDel {}
  public interface GroupImageCategoryDelBatch {}

  @NotNull(groups = {GroupImageCategoryEdit.class, GroupImageCategoryDel.class}, message = "surrogateId is require")
  private Long surrogateId;

  /**
   * batch operation
   */
  @NotNull(groups = {GroupImageCategoryDelBatch.class}, message = "surrogateIds cannot be null")
  private List<Long> surrogateIds;

  @NotNull(groups = {Default.class, GroupImageCategoryAdd.class}, message = "image category name cannot be null")
  @Length(groups = {Default.class, GroupImageCategoryAdd.class, GroupImageCategoryEdit.class}, max = 50, message = "label type name length must be within 50 characters.")
  private String name;

//  @NotNull(groups = {GroupImageCategorySave.class}, message = "标题图url不能为空")
  private String imageUrl;

  private Integer status;

  @Length(groups = {Default.class, GroupImageCategoryAdd.class, GroupImageCategoryEdit.class},max = 200, message = "remark length must be within 200 characters.")
  private String remark;
}
