package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.pojo.req.role.RoleListPageParam;
import com.cy.single.blog.pojo.resp.role.SysRoleVo;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-24
 */
public interface SysRoleMapper extends BaseMapper<SysRole> {

    IPage<SysRoleVo> selectRoleListPage(Page<SysRoleVo> page, @Param("param") RoleListPageParam param);
}
