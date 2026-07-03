package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysAclModuleMapper;
import com.cy.single.blog.pojo.dto.sys.acl.AclDTO;
import com.cy.single.blog.pojo.dto.sys.aclmodule.AclModuleDTO;
import com.cy.single.blog.pojo.entity.sys.SysAcl;
import com.cy.single.blog.pojo.entity.sys.SysMenu;
import com.cy.single.blog.service.*;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static com.cy.single.blog.common.constants.FrontConstants.FRONT_ROUTER_PREFIX;

/**
 * @Author: Lil-K
 * @Date: 2025/3/18
 * @Description:
 */
@Service
public class SysMenuServiceImpl implements SysPermissionService {

  @Autowired
  private MessageLangService msgService;

  @Autowired
  private SysRoleService roleService;

  @Autowired
  private SysTreeService treeService;

  @Autowired
  private SysAclCoreService coreService;

  @Autowired
  private SysAclModuleMapper aclModuleMapper;

  /**
   * 获取用户-菜单
   * 菜单配置:
   *  1. 如果当前权限模块就是需要跳转的url, 那么就配置权限点, 并且设置为[菜单]模式
   *  2. 如果还有下一层菜单, 当前模块就不配置权限点, 并且配置为 [菜单] 模式
   *  3. 最后一层不需要配置为[菜单]模式, 填写正确的url即可
   * @return
   */
  @Override
  public ApiResp<Map<String, Object>> permission() {
    Map<String, Object> userPermissionMap = Maps.newHashMap();
    /**
     * 1. 获取当前用户对应的菜单权限
     */
    Long userId = RequestHolder.getCurrentUser().getSurrogateId();
    List<AclModuleDTO> aclModuleDTOList = treeService.userAclTree(userId);

    /**
     * 转换为菜单结构
     */
    List<SysMenu> menuList = changeTreeToMenu(aclModuleDTOList, FRONT_ROUTER_PREFIX);

    /**
     * 2. 请求当前用户[按钮]类型的权限点
     * type:2 -> 按钮类型
     */
    List<SysAcl> userAclList = coreService.getUserAclList(userId, 2);
    List<String> btnSignList = Optional.ofNullable(userAclList)
      .filter(CollectionUtils::isNotEmpty)
      .map(list -> list.stream().map(SysAcl::getBtnSign).collect(Collectors.toList()))
      .orElseGet(ArrayList::new);

    /**
     * 3. 组装数据, 同时给出菜单数据和按钮数据
     */
    userPermissionMap.put("menuList", menuList);
    userPermissionMap.put("btnSignList", btnSignList);
    return ApiResp.success(userPermissionMap);
  }

  /**
   * 构建菜单
   * @param aclModuleDTOList
   * @return
   */
  private List<SysMenu> changeTreeToMenu(List<AclModuleDTO> aclModuleDTOList, String rootPath) {
    List<SysMenu> menuList = Lists.newArrayList();
    if (CollectionUtils.isEmpty(aclModuleDTOList)) {
      return menuList;
    }

    for (AclModuleDTO aclModuleDto : aclModuleDTOList) {
      /**
       * 检查当前模块是否有满足条件的权限点
       */
      boolean hasValidAcl = aclModuleDto.getAclDTOList().stream()
        .anyMatch(acl -> acl.isChecked() && acl.isHasAcl());
      if (!hasValidAcl && CollectionUtils.isEmpty(aclModuleDto.getAclModuleDTOList())) {
        continue;
      }

      SysMenu menu = new SysMenu();

      /**
       * case1: 当前模块构成菜单时, 并且本身需要跳转url, 并且没有下级子模块时, 比如[首页]
       */
      if (!aclModuleDto.getMenuUrl().equals("-")
        && CollectionUtils.isNotEmpty(aclModuleDto.getAclDTOList())
        && CollectionUtils.isEmpty(aclModuleDto.getAclModuleDTOList())
      ) {
        AclDTO aclDto = aclModuleDto.getAclDTOList().stream()
          .filter(acl -> acl.getType() == 1 && acl.isChecked() && acl.isHasAcl()) // 过滤条件
          .findAny()
          .orElse(null);

        if (aclDto != null) {
          menu.setKey(aclDto.getMenuUrl());
          menu.setTitle(aclDto.getMenuName());
          menu.setPath(rootPath + aclDto.getMenuUrl());
          menu.setUniqueSign(pathToCamelCase(rootPath + aclDto.getMenuUrl()));
          menuList.add(menu);
        }
      }

      /**
       * case2: 当本层不作为跳转菜单, 就以权限点中的菜单作为跳转
       */
      if (aclModuleDto.getMenuUrl().equals("-")
        && CollectionUtils.isNotEmpty(aclModuleDto.getAclDTOList())
        && CollectionUtils.isEmpty(aclModuleDto.getAclModuleDTOList())
      ) {
        AclDTO aclDto = aclModuleDto.getAclDTOList().stream()
          .filter(acl -> acl.getType() == 1 && acl.isChecked() && acl.isHasAcl()) // 过滤条件
          .findAny()
          .orElse(null);

        if (aclDto != null) {
          menu.setKey(aclDto.getMenuUrl());
          menu.setTitle(aclDto.getMenuName());
          menu.setPath(rootPath + aclDto.getMenuUrl());
          menu.setUniqueSign(pathToCamelCase(rootPath + aclDto.getMenuUrl()));
          menuList.add(menu);
        }
      }

      /**
       * case3: 当权限模块有值, 权限点为空时, 说明当前权限模块有子菜单, 需要递归处理
       */
      if (!aclModuleDto.getMenuUrl().equals("-")
        && CollectionUtils.isEmpty(aclModuleDto.getAclDTOList())
        && CollectionUtils.isNotEmpty(aclModuleDto.getAclModuleDTOList())) {
        /**
         * 递归处理子菜单
         */
        List<SysMenu> subMenuList = changeTreeToMenu(aclModuleDto.getAclModuleDTOList(), rootPath + aclModuleDto.getMenuUrl());

        // 如果子菜单列表不为空，才将当前模块作为父菜单
        if (CollectionUtils.isNotEmpty(subMenuList)) {
          menu.setKey(aclModuleDto.getMenuUrl());
          menu.setTitle(aclModuleDto.getName());
          menu.setPath(rootPath + aclModuleDto.getMenuUrl());
          menu.setUniqueSign(pathToCamelCase(rootPath + aclModuleDto.getMenuUrl()));
          menu.getChildren().addAll(subMenuList);
          menuList.add(menu);
        }
      }
    }
    return menuList;
  }

  /**
   * 将 / 转为 _
   * 让前端能够识别并添加额外的样式图标和路由组件
   * @param input
   * @return
   */
  private String pathToCamelCase(String input) {
    if (StringUtils.isBlank(input)) {
      return "";
    }
    // 将 / 转为 _
    String[] parts = input.toLowerCase().split("/");
    return Joiner.on("_").join(parts);
  }

}
