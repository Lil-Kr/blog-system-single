package com.cy.single.blog.pojo.req.blog.label;

import com.cy.single.blog.base.BaseParameter;
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
public class BlogLabelReq extends BaseParameter {

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

    @Length(groups = {Default.class, GroupLabelSave.class},max = 200, message = "备注长度必须在200个字符以内")
    private String remark;


    public Long getSurrogateId() {
        return surrogateId;
    }

    public void setSurrogateId(Long surrogateId) {
        this.surrogateId = surrogateId;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}