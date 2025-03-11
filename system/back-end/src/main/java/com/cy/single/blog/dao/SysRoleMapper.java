package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.pojo.req.role.RoleListPageReq;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/11
 * @Description:
 */
public interface SysRoleMapper extends BaseMapper<SysRole> {

	Integer deleteBySurrogateId(@Param("surrogateId") Long surrogateId);

	List<SysRole> pageRoleList(@Param("param") RoleListPageReq req);

	Integer roleCount(@Param("param") RoleListPageReq req);
}