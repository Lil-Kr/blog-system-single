package com.cy.single.blog.pojo.req.dict;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * @Author: Lil-K
 * @Date: 2025/3/11
 * @Description:
 */
@Data
@ToString
public class DictDetailPageListReq extends BasePageReq implements Serializable {

	private static final long serialVersionUID = 1290392551670370158L;

	@NotNull(message = "字典id不能为空")
	private Long dictId;

	private Integer type;

	private String name;

	private String remark;
}
