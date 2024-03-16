package com.cy.single.blog.pojo.req.org;

import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;

/**
 * <p>
 * 
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-24
 */
@Data
@ToString
public class OrgParam {

    public interface GroupEdit {}

    /**
     * 自增主键
     */
    @NotNull(groups = {GroupEdit.class},message = "组织id不能为空")
    private Long id;

    /**
     * 组织唯一主键
     */
    @NotNull(groups = {GroupEdit.class},message = "组织surrogateId不能为空")
    private Long surrogateId;

    /**
     * 组织名称
     */
    @NotBlank(message = "组织名称不能为空")
    @Length(min = 2,max = 20,message = "组织名称需要在2到20个字符之间")
    private String name;

    /**
     * 上级组织id
     */
    @NotNull(message = "上级组织parentId不能为空")
    private Long parentId;

    /**
     * 上级组织surrogateId
     */
    @NotNull(message = "上级组织parentSurrogateId不能为空")
    private Long parentSurrogateId;

    /**
     * 排序, 组织咋当前层级目录下的顺序
     */
    @NotNull(message = "组织顺序不能为空")
    private Integer seq;

    /**
     * 备注
     */
    @Length(max = 150,message = "组织备注需要在150个字符以内")
    private String remark;

}
