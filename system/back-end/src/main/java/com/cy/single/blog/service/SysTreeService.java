package com.cy.single.blog.service;

import com.cy.single.blog.pojo.dto.aclmodule.AclModuleDto;
import com.cy.single.blog.pojo.dto.org.OrgLevelDto;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
public interface SysTreeService {

	List<OrgLevelDto> orgTree();

	List<OrgLevelDto> orgListToTree(List<OrgLevelDto> dtoList);

	List<AclModuleDto> aclModuleTree();

	List<AclModuleDto> roleAclTree(Long roleSurrogateId);

	List<AclModuleDto> userAclTree(Long userId);
}