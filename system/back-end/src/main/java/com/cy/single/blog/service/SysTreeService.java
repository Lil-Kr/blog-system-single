package com.cy.single.blog.service;

import com.cy.single.blog.pojo.dto.sys.acl.AclDTO;
import com.cy.single.blog.pojo.dto.sys.aclmodule.AclModuleDTO;
import com.cy.single.blog.pojo.dto.sys.org.OrgLevelDTO;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
public interface SysTreeService {

	List<OrgLevelDTO> orgTree();

//	List<OrgLevelDto> orgListToTree(List<OrgLevelDto> dtoList);

	List<AclModuleDTO> aclModuleTree();


	List<AclModuleDTO> roleAclTree(Long roleSurrogateId);

	List<AclModuleDTO> userAclTree(Long userId);

	List<AclModuleDTO> aclListToTree(List<AclDTO> aclDTOList);

}