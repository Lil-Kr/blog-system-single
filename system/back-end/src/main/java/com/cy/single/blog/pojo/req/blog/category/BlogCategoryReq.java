package com.cy.single.blog.pojo.req.blog.category;

import com.cy.single.blog.base.BaseEntity;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description:
 */
@ToString
@Data
public class BlogCategoryReq extends BaseEntity {

    public interface GroupTypeSave {}
    public interface GroupTypeEdit {}
    public interface GroupTypeDel {}
    public interface GroupTypeDelBatch {}

    @NotNull(groups = {GroupTypeEdit.class, GroupTypeDel.class}, message = "surrogateId是必须的")
    private Long surrogateId;

    /**
     * batch operation
     */
    @NotNull(groups = {GroupTypeDelBatch.class}, message = "批量删除surrogateId不能为空")
    private List<Long> surrogateIds;

    @NotNull(groups = {GroupTypeSave.class, GroupTypeEdit.class}, message = "编号不能为空")
    private String number;

    @NotNull(groups = {Default.class, GroupTypeSave.class}, message = "标签类型名不能为空")
    @Length(groups = {Default.class, GroupTypeSave.class, GroupTypeEdit.class}, max = 50, message = "标签类型名长度在50个字符以内")
    private String name;

    @Length(groups = {Default.class, GroupTypeSave.class},max = 200, message = "备注长度必须在200个字符以内")
    private String remark;

}
