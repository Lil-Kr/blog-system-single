package com.cy.single.blog.pojo.param.dict;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

@ToString
@Data
public class DictSaveDetailParam {

    /**
     * 数据字典id唯一主键
     */
    private Long surrogateId;

    /**
     * 数据字典主表surrogate_id
     */
    @NotNull(message = "parentId不能为空")
    private Long parentId;

    /**
     * 数据字典明细名称
     */
    @NotBlank(message = "数据字典明细名称name不能为空")
    @Length(min = 1,max = 50,message = "数据字典明细名称name长度必须在1~50个字符之间")
    private String name;

    /**
     * 备注
     */
    @Length(min = 0,max = 100,message = "数据字典明细备注remark长度必须100个字符以内")
    private String remark;
}
