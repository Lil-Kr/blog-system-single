package com.cy.single.blog.pojo.req.dict;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2025/3/11
 * @Description:
 */
@Data
@ToString
public class DictListPageReq extends BasePageReq {

	/**
	 * 数据字典明细名称
	 */
	private String name;

	/**
	 * 备注
	 */
	private String remark;
}
