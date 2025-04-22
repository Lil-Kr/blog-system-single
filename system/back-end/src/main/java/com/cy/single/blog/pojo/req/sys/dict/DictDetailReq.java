package com.cy.single.blog.pojo.req.sys.dict;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;

/**
 * @Author: Lil-K
 * @Date: 2025/3/9
 * @Description:
 */
@Data
@ToString
public class DictDetailReq {

	public interface GroupGetDictDetail{}

	private Long surrogateId;

	@NotNull(message = "surrogateId不能为空", groups = {GroupGetDictDetail.class})
	private Long dictSurrogateId;
}
