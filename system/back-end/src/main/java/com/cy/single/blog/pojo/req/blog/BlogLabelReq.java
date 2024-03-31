package com.cy.single.blog.pojo.req.blog;

import com.cy.single.blog.base.BaseDO;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
@ToString
public class BlogLabelReq extends BaseDO {

    public interface GroupTypeSave {}
    public interface GroupTypeEdit {}
    public interface GroupTypeDel {}

    private Long id;

    @NotNull(groups = {GroupTypeEdit.class, GroupTypeDel.class}, message = "surrogateId是必须的")
    private Long surrogateId;

    private Integer number;

    @NotNull(groups = {Default.class, GroupTypeSave.class}, message = "标签类型名不能为空")
    @Length(groups = {Default.class, GroupTypeSave.class}, max = 50, message = "标签类型名长度在50个字符以内")
    private String name;

    @Length(groups = {Default.class, GroupTypeSave.class},max = 200, message = "备注长度必须在200个字符以内")
    private String remark;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSurrogateId() {
        return surrogateId;
    }

    public void setSurrogateId(Long surrogateId) {
        this.surrogateId = surrogateId;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
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
