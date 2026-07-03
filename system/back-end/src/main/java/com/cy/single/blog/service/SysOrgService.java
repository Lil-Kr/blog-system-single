package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.dto.sys.org.OrgLevelDTO;
import com.cy.single.blog.pojo.req.sys.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.sys.org.OrgPageReq;
import com.cy.single.blog.pojo.req.sys.org.OrgReq;
import com.cy.single.blog.pojo.resp.sys.org.SysOrgResp;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/3
 * @Description:
 */
public interface SysOrgService {
	
	ApiResp<String> add(OrgReq req);

	ApiResp<String> edit(OrgReq req);

	List<OrgLevelDTO> orgTree();

	ApiResp<String> delete(Long surrogateId);

	PageResult<SysOrgResp> pageList(OrgPageReq req);

	List<SysOrgResp> list(OrgListAllReq req);

}