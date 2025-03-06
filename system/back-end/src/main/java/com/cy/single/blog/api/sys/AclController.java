package com.cy.single.blog.api.sys;


import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.acl.AclPageReq;
import com.cy.single.blog.pojo.req.acl.AclReq;
import com.cy.single.blog.pojo.req.roleacl.RoleAclSaveReq;
import com.cy.single.blog.pojo.req.roleuser.RoleUserReq;
import com.cy.single.blog.pojo.vo.sys.acl.SysAclVo;
import com.cy.single.blog.service.SysAclService;
import com.cy.single.blog.service.SysRoleAclService;
import com.cy.single.blog.service.SysRoleUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: 权限管理模块
 */
@RestController
@RequestMapping("/sys/acl")
@Slf4j
public class AclController {

    @Autowired
    private SysAclService aclService;

    @Autowired
    private SysRoleUserService roleUserService;

    @Autowired
    private SysRoleAclService roleAclService;

    /**
     * 分页查询权限点列表
     * @param req
     * @return
     * @throws Exception
     */
    @PostMapping("/pageList")
    public ApiResp<PageResult<SysAclVo>> pageList(@RequestBody @Valid AclPageReq req) {
        PageResult<SysAclVo> res = aclService.pageList(req);
        return ApiResp.success(res);
    }

    /**
     * 权限点信息保存
     * @param req
     * @return
     */
    @PostMapping("/addAcl")
    public ApiResp<String> addAcl(@RequestBody @Valid AclReq req) {
        return aclService.addAcl(req);
    }

    /**
     * 修改权限点信息
     * @param req
     * @return
     */
    @PostMapping("/editAcl")
    public ApiResp<String> editAcl(@RequestBody @Valid AclReq req) {
        return aclService.editAcl(req);
    }

    /**
     * 获取权限点分配的用户角色
     */
    @PostMapping("/acls")
    public ApiResp<ConcurrentHashMap<String, Object>> acls(@RequestBody @Validated({AclReq.GroupAcls.class}) AclReq req) {
        return aclService.acls(req);
    }

    /**
     * 获取角色分配的用户列表
     * @param req
     * @return
     * @throws Exception
     */
    @PostMapping("/roleUserList")
    public ApiResp<Map<String, List<SysUser>>> roleUserList(@RequestBody @Validated({RoleUserReq.GroupRoleUserPageList.class}) RoleUserReq req) {
        return roleUserService.roleUserList(req);
    }

    /**
     * 维护[角色-用户]关系接口
     * @param param
     * @return
     * @throws Exception
     */
    @PostMapping("/changeRoleUsers")
    public ApiResp<String> changeRoleUsers(@RequestBody @Validated({RoleUserReq.GroupChangeRoleUsers.class}) RoleUserReq param) {
        return roleUserService.updateRoleUsers(param);
    }

    /**
     * 修改[角色-权限]关系
     * @param param
     * @return
     * @throws Exception
     */
    @PostMapping("/changeRoleAcls")
    public ApiResp<String> changeRoleAcls(@RequestBody @Validated({RoleAclSaveReq.GroupChangeAcls.class}) RoleAclSaveReq param) {
        return roleAclService.changeRoleAcls(param);
    }

}

