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
 * @Description: BasePageReq
 */
@ToString
@Data
public class BasePageReq extends BaseReq implements Serializable {

	private static final long serialVersionUID = -6142804525222073440L;

	public interface GroupPageQuery{}

	/**
	 */
	@NotNull(groups = {GroupPageQuery.class}, message = "current page number cant not be null")
	@Min(groups = {GroupPageQuery.class}, value = 1, message ="page number cant not less than 1")
	@Max(groups = {GroupPageQuery.class}, value = 10, message ="page number cant not greater than 10")
	private Integer currentPageNum;

	@NotNull(groups = {GroupPageQuery.class}, message = "page size cant not be null")
	@Max(groups = {GroupPageQuery.class}, value = 100, message = "page size cant not greater than 100")
	private Integer pageSize;
}