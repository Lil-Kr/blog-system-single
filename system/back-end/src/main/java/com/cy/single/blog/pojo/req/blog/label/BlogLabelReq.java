package com.cy.single.blog.pojo.req.blog.label;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.Date;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
@ToString
@Data
public class BlogLabelReq {

  public interface GroupLabelSave {}
  public interface GroupLabelEdit {}
  public interface GroupLabelDel {}
  public interface GroupLabelDelBatch {}

  @NotNull(groups = {GroupLabelEdit.class, GroupLabelDel.class}, message = "surrogateId is require")
  private Long surrogateId;

  /**
   * batch operation
   */
  @NotNull(groups = {GroupLabelDelBatch.class}, message = "surrogateIds is require")
  private List<Long> surrogateIds;

  private String number;

  @NotNull(groups = {Default.class, GroupLabelSave.class}, message = "label type name cannot be null")
  @Length(groups = {Default.class, GroupLabelSave.class, GroupLabelEdit.class}, max = 50, message = "Label type name length must be within 50 characters.")
  private String name;

  @NotBlank(groups = {Default.class, GroupLabelSave.class}, message = "label color cannot be empty")
  private String color;

  @NotNull(groups = {Default.class, GroupLabelSave.class, GroupLabelEdit.class}, message = "colorText cannot be null")
  private String colorText;

  @Length(groups = {Default.class, GroupLabelSave.class}, max = 200, message = "remark length must be within 200 characters.")
  private String remark;

  /**
   * 创建人
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long creatorId;

  /**
   * 修改人
   */
  @JsonSerialize(using = ToStringSerializer.class)
  private Long operator;

  /**
   * 创建时间
   */
  private Date createTime;

  /**
   * 更改时间
   */
  private Date updateTime;
}
