package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.dto.org.OrgLevelDto;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.pojo.req.org.OrgGetChildrenReq;
import com.cy.single.blog.pojo.req.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.org.OrgReq;
import com.cy.single.blog.pojo.resp.org.SysOrgVO;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/3
 * @Description:
 */
public interface SysOrgService {
	
	ApiResp<String> add(OrgReq param);

	ApiResp<String> edit(OrgReq param);

	PageResult<SysOrg> list(OrgListAllReq param);

	PageResult<SysOrgVO> getChildrenOrgList(OrgGetChildrenReq dto);

	List<OrgLevelDto> orgTree();

	ApiResp<String> delete(Long surrogateId);

	PageResult<SysOrgVO> pageOrgList(OrgListAllReq param);

}