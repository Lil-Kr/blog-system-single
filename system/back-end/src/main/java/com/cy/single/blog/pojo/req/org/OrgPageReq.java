package com.cy.single.blog.pojo.req.org;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2025/3/6
 * @Description:
 */
@Data
@ToString
public class OrgPageReq extends BasePageReq {

	public interface GroupChildOrgList{};

	@NotNull(groups = {GroupChildOrgList.class}, message = "surrogateId不能为空")
	private Long surrogateId;


	// org number
	private String number;

	// org name
	private String name;

	private Integer seq;
}
