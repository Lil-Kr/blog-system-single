package com.cy.single.blog.pojo.req.blog.label;

import com.cy.single.blog.base.BaseEntity;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
@ToString
@Data
public class BlogLabelReq extends BaseEntity {

    public interface GroupLabelSave {}
    public interface GroupLabelEdit {}
    public interface GroupLabelDel {}
    public interface GroupLabelDelBatch {}

    @NotNull(groups = {GroupLabelEdit.class, GroupLabelDel.class}, message = "surrogateId是必须的")
    private Long surrogateId;

    /**
     * batch operation
     */
    @NotNull(groups = {GroupLabelDelBatch.class}, message = "批量删除surrogateId不能为空")
    private List<Long> surrogateIds;

    private String number;

    @NotNull(groups = {Default.class, GroupLabelSave.class}, message = "标签类型名不能为空")
    @Length(groups = {Default.class, GroupLabelSave.class, GroupLabelEdit.class}, max = 50, message = "标签类型名长度在50个字符以内")
    private String name;

//    @NotNull(groups = {Default.class, GroupLabelSave.class}, message = "标签颜色不能为空")
//    @Length(groups = {Default.class, GroupLabelSave.class, GroupLabelEdit.class}, max = 20, message = "标签颜色值不超过20个字符")
    private String color;

    @NotNull(groups = {Default.class, GroupLabelSave.class, GroupLabelEdit.class}, message = "标签展示颜色不能为空")
    private String colorText;

    @Length(groups = {Default.class, GroupLabelSave.class},max = 200, message = "备注长度必须在200个字符以内")
    private String remark;

}
