package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.org.OrgDeleteParam;
import com.cy.single.blog.pojo.req.org.OrgGetChildrenParam;
import com.cy.single.blog.pojo.req.org.OrgListAllParam;
import com.cy.single.blog.pojo.req.org.OrgParam;
import com.cy.single.blog.pojo.resp.org.SysOrgVO;

/**
 * @Author: Lil-K
 * @Date: 2025/3/3
 * @Description:
 */
public interface SysOrgService {
	
	ApiResp<String> add(OrgParam param);

	ApiResp<String> edit(OrgParam param);

	PageResult<SysOrgVO> pageList(OrgListAllParam param);

	PageResult<SysOrgVO> list(OrgListAllParam param);

	PageResult<SysOrgVO> getChildrenOrgList(OrgGetChildrenParam dto);

	ApiResp orgTree();

	ApiResp<String> delete(OrgDeleteParam dto);

}