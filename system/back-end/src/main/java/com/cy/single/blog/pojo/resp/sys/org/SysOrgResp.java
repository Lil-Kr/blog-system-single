package com.cy.single.blog.pojo.resp.sys.org;

import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.ToString;

/**
 * @author Lil-Kr
 * @since 2020-11-24
 */
@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SysOrgResp extends SysOrg {

	private String parentName;

	private String operatorName;
}
