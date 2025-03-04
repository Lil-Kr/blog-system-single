package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.pojo.req.org.OrgListAllReq;
import com.cy.single.blog.pojo.resp.org.SysOrgVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *
 */
@Mapper
public interface SysOrgMapper extends BaseMapper<SysOrg> {

	List<SysOrg> selectChildOrgList(@Param("level") String oldLevelPrefix);

	List<SysOrg> selectChildOrgListByParentId(@Param("parentId") Long parentId);

	List<SysOrgVO> pageList(@Param("param") OrgListAllReq req);

	Integer countByList(@Param("param") OrgListAllReq req);
}
