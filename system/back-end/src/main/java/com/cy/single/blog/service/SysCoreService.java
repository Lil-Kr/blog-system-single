package com.cy.single.blog.service;


import com.cy.single.blog.pojo.entity.sys.SysAcl;

import java.util.List;

/**
 * @author Lil-K
 * @since 2020-11-26
 */
public interface SysCoreService {

    /**
     * 获取当前用户所拥有的权限列表
     */
    List<SysAcl> getCurrentUserAclList();

    /**
     * 获取[角色-权限]列表
     */
    List<SysAcl> getRoleAclList(Long roleSurrogateId);


    List<SysAcl> getUserAclList(Long userId);

}
