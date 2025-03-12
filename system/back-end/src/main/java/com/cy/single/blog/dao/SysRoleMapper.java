package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.pojo.req.role.RoleListPageReq;
import com.cy.single.blog.pojo.vo.sys.role.SysRoleVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/11
 * @Description:
 */
public interface SysRoleMapper extends BaseMapper<SysRole> {

	Integer deleteBySurrogateId(@Param("surrogateId") Long surrogateId);

	List<SysRoleVO> pageRoleList(@Param("param") RoleListPageReq req);

	Integer countRolePage(@Param("param") RoleListPageReq req);

	List<SysRoleVO> selectRoleLIstByIds(@Param("roleIdList") List<Long> roleIdList);
}