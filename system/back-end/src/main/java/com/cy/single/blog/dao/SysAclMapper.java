package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.req.acl.AclPageReq;
import com.cy.single.blog.pojo.req.acl.AclReq;
import com.cy.single.blog.pojo.resp.sys.acl.SysAclResp;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/9
 * @Description:
 */
public interface SysAclMapper extends BaseMapper<SysAcl> {

	List<SysAcl> selectAclListByAclIdList(@Param("userAclIdList") List<Long> userAclIdList);

	List<SysAclResp> pageAclList(@Param("param") AclPageReq req);

	Integer countPageAclList(@Param("param") AclPageReq req);

	List<Long> selectAclIdAllList(@Param("param") AclReq req);

	SysAcl getAcl(@Param("param") AclReq req);

	List<SysAcl> selectAclListByUrl(@Param("url") String url);
}
