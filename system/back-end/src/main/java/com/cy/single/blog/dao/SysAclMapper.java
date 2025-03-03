package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.req.acl.AclPageParam;
import com.cy.single.blog.pojo.resp.acl.SysAclVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-K
 * @since 2020-11-24
 */
public interface SysAclMapper extends BaseMapper<SysAcl> {

    List<SysAclVo> selectAclListPage(@Param("param") AclPageParam param);

    List<SysAcl> selectAclListByAclIdList(@Param("userAclIdList") List<Long> userAclIdList);
}
