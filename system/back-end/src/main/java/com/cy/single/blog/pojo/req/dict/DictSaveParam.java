package com.cy.single.blog.pojo.req.dict;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

@Data
@ToString
public class DictSaveParam {

    /**
     * 自增主键
     */
    private Long id;

    /**
     * 数据字典id唯一主键
     */
    private Long surrogateId;

    /**
     * 数据字典名称
     */
    @NotBlank(message = "字典名不能为空")
    @Length(min = 2,max = 20,message = "数据字典名长度必须在2~20个字符之间")
    private String name;

    /**
     * 数据字典类型, 从0开始递增
     */
    @NotNull(message = "数据字典类型不能为空")
    private Integer type;

    /**
     * 备注
     */
    @Length(min = 0,max = 100,message = "数据字典备注长度必须在100个字符以内")
    private String remark;
}
