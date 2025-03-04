package com.cy.single.blog.api.sys;


import com.cy.single.blog.aspect.annotations.CheckAuth;
import com.cy.single.blog.aspect.annotations.RecordLogger;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.BasePageReq;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.dto.aclmodule.AclModuleDto;
import com.cy.single.blog.pojo.entity.sys.SysRole;
import com.cy.single.blog.pojo.req.role.RoleListPageReq;
import com.cy.single.blog.pojo.req.role.RoleSaveReq;
import com.cy.single.blog.pojo.resp.role.SysRoleVo;
import com.cy.single.blog.service.SysRoleService;
import com.cy.single.blog.service.impl.SysTreeService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

import static com.cy.single.blog.common.constants.ResponseConstant.ROLE_ROLE_TREE_INFO;

/**
 * 角色管理模块
 * @author Lil-Kr
 * @since 2020-11-28
 */
@RestController
@RequestMapping("/sys/role")
@Slf4j
public class RoleController {

    @Resource
    private SysRoleService roleService;

    @Resource
    private SysTreeService treeService;

//    @Resource
//    private SysRoleUserService sysRoleUserService1;
//
//    @Resource
//    private SysRoleAclService sysRoleAclService1;

    /**
     * 分页查询角色列表
     * @param req
     * @return
     * @throws Exception
     */
    @RecordLogger
    @CheckAuth
    @PostMapping("pageList")
    public ApiResp<PageResult<SysRole>> pageList (@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) RoleListPageReq req) throws Exception {
        PageResult<SysRole> res = roleService.pageList(req);
        return ApiResp.success(res);
    }

    /**
     * 保存角色信息
     * @param req
     * @return
     * @throws Exception
     */
    @RecordLogger
    @CheckAuth
    @PostMapping("add")
    public ApiResp<String> add (@RequestBody @Valid RoleSaveReq req) {
        return roleService.add(req);
    }

    /**
     * 修改角色信息
     * @param req
     * @return
     * @throws Exception
     */
    @RecordLogger
    @CheckAuth
    @PostMapping("edit")
    public ApiResp<String> edit (@RequestBody @Validated({BasePageReq.GroupPageQuery.class}) RoleSaveReq req) throws Exception {
        return roleService.edit(req);
    }


    @RecordLogger
    @CheckAuth
    @PostMapping("freeze")
    public ApiResp<String> freeze (@RequestBody @Validated({RoleSaveReq.GroupFreeze.class}) RoleSaveReq req) {
        return roleService.freeze(req);
    }

    /**
     * 删除角色信息
     * @param surrogateId
     */
    @RecordLogger
    @CheckAuth
    @DeleteMapping("delete")
    public ApiResp delete (@RequestParam("surrogateId") @NotNull(message = "surrogateId是必须的") Long surrogateId) {
        return roleService.delete(surrogateId);
    }

    /**
     * 获取当前用户所拥有的[角色-权限]树
     * @param req
     * @return
     * @throws Exception
     */
    @RecordLogger
    @CheckAuth
    @PostMapping("roleTree")
    public ApiResp roleTree(@RequestBody @Validated({RoleSaveReq.GroupTreeOrDel.class}) RoleSaveReq req) throws Exception {
        List<AclModuleDto> aclModuleDtoList = treeService.roleAclTree(req.getSurrogateId());
        if (CollectionUtils.isNotEmpty(aclModuleDtoList)) {
            return ApiResp.success(aclModuleDtoList);
        }else {
            return ApiResp.failure(ROLE_ROLE_TREE_INFO);
        }
    }

    /**
     * 获取所有角色信息
     * @param param
     * @return
     * @throws Exception
     */
    @RecordLogger
    @CheckAuth
    @PostMapping("listAll")
    public ApiResp<PageResult<SysRoleVo>> listAll (@RequestBody @Valid RoleListPageReq param) throws Exception {
//        return roleService.list(param);
        return null;
    }

//    /**
//     * 修改角色对应的权限点
//     * 维护[角色-权限]关系接口
//     * @param param
//     * @return
//     * @throws Exception
//     */
//    @PostMapping("changeRoleAcls")
//    public ApiResp changeRoleAcls(@RequestBody @Validated({RoleAclSaveParam.GroupChangeAcls.class}) RoleAclSaveParam param) throws Exception {
//        return sysRoleAclService1.changeRoleAcls(param);
//    }
//
//    /**
//     * 获取[角色-用户]列表
//     * @param param
//     * @return
//     * @throws Exception
//     */
//    @PostMapping("roleUserList")
//    public ApiResp roleUserList(@RequestBody @Validated({RoleUserParam.GroupRoleUserPageList.class}) RoleUserParam param) throws Exception {
//        return sysRoleUserService1.roleUserList(param);
//    }
//
//    /**
//     * 维护[角色-用户]关系接口
//     * @param param
//     * @return
//     * @throws Exception
//     */
//    @PostMapping("changeRoleUsers")
//    public ApiResp changeRoleUsers(@RequestBody @Validated({RoleUserParam.GroupChangeRoleUsers.class}) RoleUserParam param) throws Exception {
//        return sysRoleUserService1.changeRoleUsers(param);
//    }

}

