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

  public interface GroupImageCategorySave {}
  public interface GroupImageCategoryEdit {}
  public interface GroupImageCategoryDel {}
  public interface GroupImageCategoryDelBatch {}

  @NotNull(groups = {GroupImageCategoryEdit.class, GroupImageCategoryDel.class}, message = "surrogateId是必须的")
  private Long surrogateId;

  /**
   * batch operation
   */
  @NotNull(groups = {GroupImageCategoryDelBatch.class}, message = "批量删除surrogateId不能为空")
  private List<Long> surrogateIds;

  @NotNull(groups = {GroupImageCategorySave.class, GroupImageCategoryEdit.class}, message = "编号不能为空")
  private String number;

  @NotNull(groups = {Default.class, GroupImageCategorySave.class}, message = "图片分类名不能为空")
  @Length(groups = {Default.class, GroupImageCategorySave.class, GroupImageCategoryEdit.class}, max = 50, message = "标签类型名长度在50个字符以内")
  private String name;

//  @NotNull(groups = {GroupImageCategorySave.class}, message = "标题图url不能为空")
  private String imageUrl;

  @Length(groups = {Default.class, GroupImageCategorySave.class, GroupImageCategoryEdit.class},max = 200, message = "备注长度必须在200个字符以内")
  private String remark;
}
