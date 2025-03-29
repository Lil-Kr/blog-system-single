package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.pojo.req.org.OrgListAllReq;
import com.cy.single.blog.pojo.req.org.OrgPageReq;
import com.cy.single.blog.pojo.vo.sys.org.SysOrgVO;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 *
 */
public interface SysOrgMapper extends BaseMapper<SysOrg> {

	List<SysOrg> selectChildOrgList(@Param("level") String oldLevelPrefix);

	List<SysOrg> selectChildOrgListByParentId(@Param("parentId") Long parentId);

	List<SysOrgVO> pageList(@Param("param") OrgPageReq req);

	Integer countByList(@Param("param") OrgPageReq req);

	List<SysOrgVO> retrieveAllList(@Param("param") OrgListAllReq req);
}
