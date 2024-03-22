package com.cy.single.blog.pojo.resp.org;

import com.cy.single.blog.pojo.entity.SysOrg;
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
public class SysOrgVO extends SysOrg {

}
