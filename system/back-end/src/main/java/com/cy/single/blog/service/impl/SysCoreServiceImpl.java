package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.*;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.service.SysCoreService;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SysCoreServiceImpl implements SysCoreService {

    @Autowired
    private SysCoreMapper coreMapper;

    @Autowired
    private SysAclMapper aclMapper;

    @Autowired
    private SysRoleMapper roleMapper;

    @Autowired
    private SysRoleUserMapper roleUserMapper;

    @Autowired
    private SysRoleAclMapper roleAclMapper;

    /**
     * 获取当前用户所拥有的权限列表
     * @return List<SysAcl>
     * @throws Exception
     */
    @Override
    public List<SysAcl> getCurrentUserAclList() throws Exception {
        // 获取当前用户surrogateId
        Long surrogateId = RequestHolder.getCurrentUser().getSurrogateId();
        return getUserAclList(surrogateId);
    }

    /**
     * 获取[用户-权限]列表
     * @param userSurrogateId 用户id
     * @return
     * @throws Exception
     */
    @Override
    public List<SysAcl> getUserAclList(Long userSurrogateId) throws Exception {
        // 如果当前用户是超级管理员, 返回所有的权限点列表
        if (isSuperAdmin(userSurrogateId)) {
            return aclMapper.selectList(new QueryWrapper<>());
        }

        // 1. 如果不是超级管理员, 就取出当前用户已经分配的角色id列表
        List<Long> userRoleIdList = roleUserMapper.selectRoleIdListByUserId(userSurrogateId);
        if (CollectionUtils.isEmpty(userRoleIdList)) {
            return Lists.newArrayList();
        }

        // 2. 根据角色id获取对应用户已经分配的权限点列表id(acl_id)
        List<Long> userAclIdList = roleAclMapper.selectAclIdListByRoleIdList(userRoleIdList);
        if (CollectionUtils.isEmpty(userAclIdList)) {
            return Lists.newArrayList();
        }

        // 3. 根据权限点列表id查询详细权限点列表信息
        List<SysAcl> aclList = aclMapper.selectAclListByAclIdList(userAclIdList);
        return aclList;
    }

    /**
     * 获取当前角色已分配的[角色-权限]关系列表
     * 当前角色已分配的权限点列表
     * @param roleSurrogateId
     * @return
     * @throws Exception
     */
    @Override
    public List<SysAcl> getRoleAclList(Long roleSurrogateId) {
        // 获取当前角色已分配的权限点id列表
        List<Long> aclIdList = roleAclMapper.selectAclIdListByRoleId(roleSurrogateId);
        if (CollectionUtils.isEmpty(aclIdList)) {
            return Lists.newArrayList();
        }

        // 再根据权限点id列表拿到具体的权限点列表信息
        List<SysAcl> aclByIdList = aclMapper.selectAclListByAclIdList(aclIdList);
        if (CollectionUtils.isEmpty(aclByIdList)) {
            return Lists.newArrayList();
        }
        return aclByIdList;
    }

    /**
     * 是否是超级管理员
     * 如果用户需要分配权限给下级用户, 前提是自己有所需要分配的权限
     * @return
     * @throws Exception
     */
    private boolean isSuperAdmin(long userSurrogateId) throws Exception {
        // todo 超级管理员逻辑代码
        // 查询当前用户分配的角色中是否包含是超级管理员
        List<Long> roleIdList = roleUserMapper.selectRoleIdListByUserId(userSurrogateId);

        // 根据 roleIdList 查询角色类型
        QueryWrapper<SysRole> query1 = new QueryWrapper<>();
        query1.in("surrogate_id", roleIdList);
        List<SysRole> roleList = roleMapper.selectList(query1);
        // 查看是否有超级管理员的角色
        Optional<SysRole> roleOptional = roleList.stream().filter(role -> role.getType() == 1).findFirst();
        if (roleOptional.isPresent()) {
            return true;
        }else {
            return false;
        }
    }
}
