package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.dto.sys.org.OrgLevelDto;
import com.cy.single.blog.pojo.req.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.org.OrgPageReq;
import com.cy.single.blog.pojo.req.org.OrgReq;
import com.cy.single.blog.pojo.vo.sys.org.SysOrgVO;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/3
 * @Description:
 */
public interface SysOrgService {
	
	ApiResp<String> add(OrgReq req);

	ApiResp<String> edit(OrgReq req);

	PageResult<SysOrgVO> pageChildOrgList(OrgPageReq req);

	List<OrgLevelDto> orgTree();

	ApiResp<String> delete(Long surrogateId);

	PageResult<SysOrgVO> pageOrgList(OrgPageReq req);

	List<SysOrgVO> list(OrgListAllReq req);

}