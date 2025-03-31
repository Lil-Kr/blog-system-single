package com.cy.single.blog.pojo.resp.blog;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2025/3/28
 * @Description:
 */
@ToString
@Data
public class LabelResp {

	@JsonSerialize(using = ToStringSerializer.class)
	private Long surrogateId;

	private String name;

	private String color;
}
