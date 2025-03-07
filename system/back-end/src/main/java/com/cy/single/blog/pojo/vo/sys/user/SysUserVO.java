package com.cy.single.blog.pojo.vo.sys.user;

import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SysUserVO extends SysUser {

	private String orgName;

	private String creatorName;

	private String operatorName;

}
