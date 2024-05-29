package com.cy.single.blog.pojo.req.image;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/5/29
 * @Description:
 */
@ToString
@Data
public class ImageInfoReq {

  public interface GroupImageInfoSave {}
  public interface GroupImageInfoEdit {}
  public interface GroupImageInfoDel {}
  public interface GroupImageInfoDelBatch {}

  @NotNull(groups = {GroupImageInfoEdit.class, GroupImageInfoDel.class}, message = "surrogateId是必须的")
  private Long surrogateId;

  /**
   * batch operation
   */
  @NotNull(groups = {GroupImageInfoDelBatch.class}, message = "批量删除surrogateId不能为空")
  private List<Long> surrogateIds;

  @NotNull(groups = {GroupImageInfoSave.class, GroupImageInfoEdit.class}, message = "编号不能为空")
  private String number;

  @NotNull(groups = {GroupImageInfoSave.class, GroupImageInfoEdit.class}, message = "图片名不能为空")
  @Length(groups = {GroupImageInfoSave.class, GroupImageInfoEdit.class}, max = 50, message = "图片名长度在50个字符以内")
  private String name;

  @NotNull(groups = {GroupImageInfoSave.class, GroupImageInfoEdit.class}, message = "图片原名不能为空")
  @Length(groups = {GroupImageInfoSave.class, GroupImageInfoEdit.class}, max = 50, message = "图片原名长度在50个字符以内")
  private String imageOriginalName;

  @NotNull(groups = {GroupImageInfoSave.class, GroupImageInfoEdit.class}, message = "图片原名不能为空")
  private String imageType;

  @Length(groups = {GroupImageInfoSave.class, GroupImageInfoEdit.class}, max = 200, message = "备注长度必须在200个字符以内")
  private String remark;
}
