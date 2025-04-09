package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.pojo.req.role.RoleListPageReq;
import com.cy.single.blog.pojo.resp.sys.role.SysRoleResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/11
 * @Description:
 */
@Repository
public interface SysRoleMapper extends BaseMapper<SysRole> {

  Integer deleteBySurrogateId(@Param("surrogateId") Long surrogateId);

  List<SysRoleResp> pageRoleList(@Param("param") RoleListPageReq req);

  Integer countRolePage(@Param("param") RoleListPageReq req);

  List<SysRoleResp> selectRoleLIstByIds(@Param("roleIdList") List<Long> roleIdList);
}