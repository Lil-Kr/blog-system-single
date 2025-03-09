package com.cy.single.blog.pojo.vo.sys.acl;

import com.cy.single.blog.pojo.entity.sys.SysAcl;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SysAclVO extends SysAcl {

	private String aclModuleName;
	private String creatorName;
	private String operatorName;
	private String nickName;
	private String type;
	private String aclTypeName;

}
