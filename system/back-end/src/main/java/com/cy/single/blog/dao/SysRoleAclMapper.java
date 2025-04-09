package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysRoleAcl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/11
 * @Description:
 */
@Repository
public interface SysRoleAclMapper extends BaseMapper<SysRoleAcl> {

  List<Long> selectAclIdListByRoleIdList(@Param("userRoleIdList") List<Long> userRoleIdList);

  List<Long> selectAclIdListByRoleId(@Param("roleSurrogateId") Long roleSurrogateId);

}

