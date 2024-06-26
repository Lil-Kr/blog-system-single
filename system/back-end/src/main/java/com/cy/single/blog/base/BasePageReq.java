package com.cy.single.blog.base;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * @Author: Lil-K
 * @Date: 2024/4/4
 * @Description:
 */
@ToString
@Data
public class BasePageReq extends BaseReq implements Serializable {

    private static final long serialVersionUID = -6142804525222073440L;

    public interface GroupPageQuery{}

    /**
     * todo: @Min @Max cannot be verified
     */
    @NotNull(groups = {GroupPageQuery.class}, message = "当前页码数不能为空")
    @Min(groups = {GroupPageQuery.class}, value = 1, message ="页码不能小于1")
    @Max(groups = {GroupPageQuery.class}, value = 10, message ="页码不能大于10")
    private Integer currentPageNum;

    @NotNull(groups = {GroupPageQuery.class}, message = "每页记录数不能为空")
    @Max(groups = {GroupPageQuery.class}, value = 100, message = "每页记录数不能超过100条")
    private Integer pageSize;
}