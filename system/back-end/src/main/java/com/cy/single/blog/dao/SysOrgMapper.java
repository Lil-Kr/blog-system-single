package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.pojo.req.sys.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.sys.org.OrgPageReq;
import com.cy.single.blog.pojo.resp.sys.org.SysOrgResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *
 */
@Repository
public interface SysOrgMapper extends BaseMapper<SysOrg> {

  List<SysOrg> selectChildOrgList(@Param("level") String oldLevelPrefix);

  List<SysOrg> selectChildOrgListByParentId(@Param("parentId") Long parentId);

  List<SysOrgResp> pageList(@Param("param") OrgPageReq req);

  Integer countByList(@Param("param") OrgPageReq req);

  List<SysOrgResp> retrieveAllList(@Param("param") OrgListAllReq req);
}
