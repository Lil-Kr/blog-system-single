package com.cy.single.blog.pojo.req.sys.dict;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

@ToString
@Data
public class SaveDictDetailReq {

    public interface AddDictDetail{};
    public interface EditDictDetail{};

    /**
     * 数据字典id唯一主键
     */
    @NotNull(groups = {EditDictDetail.class}, message = "surrogateId不能为空")
    private Long surrogateId;

    /**
     * 数据字典主表surrogate_id
     */
    @NotNull(groups = {AddDictDetail.class, EditDictDetail.class}, message = "parentId不能为空")
    private Long parentId;

    /**
     * 数据字典明细名称
     */
    @NotBlank(groups = {AddDictDetail.class, EditDictDetail.class}, message = "数据字典明细名称name不能为空")
    @Length(min = 1,max = 50,message = "数据字典明细名称name长度必须在1~50个字符之间")
    private String name;

    /**
     * 字典类型
     */
    @NotNull(groups = {AddDictDetail.class, EditDictDetail.class}, message = "type不能为空")
    private Integer type;

    /**
     * 备注
     */
    @Length(groups = {AddDictDetail.class, EditDictDetail.class}, max = 100, message = "数据字典明细备注remark长度必须100个字符以内")
    private String remark;
}
