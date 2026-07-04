package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysAclModuleMapper;
import com.cy.single.blog.pojo.dto.image.sys.aclmodule.AclModuleDTO;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import com.cy.single.blog.pojo.req.sys.aclmodule.AclModuleListReq;
import com.cy.single.blog.pojo.req.sys.aclmodule.AclModuleReq;
import com.cy.single.blog.pojo.resp.sys.aclmodule.SysAclModuleResp;
import com.cy.single.blog.service.MessageLangService;
import com.cy.single.blog.service.SysAclModuleService;
import com.cy.single.blog.service.SysAclService;
import com.cy.single.blog.service.SysTreeService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.cy.single.blog.utils.orgUtil.LevelUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.cy.single.blog.common.constants.CommonConstants.ACLM_PREV_NUMBER_INFO;
import static com.cy.single.blog.common.constants.CommonConstants.LANG_ZH;
import static com.cy.single.blog.enums.ReturnCodeEnum.ADD_ERROR;
import static com.cy.single.blog.enums.ReturnCodeEnum.INFO_NOT_EXIST;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: acl module
 */
@Service
@Slf4j
public class SysAclModuleServiceImpl extends ServiceImpl<SysAclModuleMapper, SysAclModule> implements SysAclModuleService {

  @Autowired
  private MessageLangService msgService;

  @Autowired
  private SysAclModuleMapper aclModuleMapper;

  @Autowired
  private SysAclService aclService;

  @Autowired
  private SysTreeService treeService;

  /**
   * 添加权限模块信息
   * @param req
   * @return
   */
  @Override
  public ApiResp<String> add(AclModuleReq req) {
    /**
     * 检查权限模块名是否相同
     */
    if (checkAclModuleExist(req.getParentSurrogateId(), req.getName(), req.getSurrogateId())) {
      return ApiResp.failure(msgService.getMessage(LANG_ZH, "sys.acl.module.resp.msg2"));
    }

    /** 计算层级 **/
    SysAclModule parentAclModule = getParentAclModule(req.getParentSurrogateId());
    String parentLevel = Objects.isNull(parentAclModule) ? null : parentAclModule.getLevel();
    Long parentId = Objects.isNull(parentAclModule) ? null : parentAclModule.getId();
    String level = LevelUtil.calculateLevel(parentLevel, parentId);

    /**
     * 设置存入的参数
     */
    parentId = LevelUtil.ROOT.equals(level) ? Long.valueOf(LevelUtil.ROOT) : parentAclModule.getSurrogateId();
    String parentName = LevelUtil.ROOT.equals(level) ? "0" : parentAclModule.getName();

    Long surrogateId = IdWorker.getSnowFlakeId(); // surrogateId
    Date currentTime = DateUtil.localDateTimeNow();// 当前时间
    SysAclModule aclModule = SysAclModule.builder()
      .surrogateId(surrogateId)
      .number(ACLM_PREV_NUMBER_INFO + surrogateId)
      .parentId(parentId)
      .parentName(parentName)
      .name(req.getName())
      .level(level)
      .seq(req.getSeq())
      .menuUrl(StringUtils.isBlank(req.getMenuUrl()) ? "-" : req.getMenuUrl())
      .status(0)
      .remark(req.getRemark())
      .createTime(currentTime)
      .updateTime(currentTime)
      .operator(RequestHolder.getCurrentUser().getSurrogateId())
      .creatorId(RequestHolder.getCurrentUser().getSurrogateId())
      .operateIp("127.0.0.1")
      .build();
    int insert = aclModuleMapper.insert(aclModule);
    if (insert >= 1) {
      return ApiResp.success(msgService.getMessage(LANG_ZH, "sys.acl.module.resp.msg1"));
    } else {
      return ApiResp.failure(ADD_ERROR);
    }
  }

  /**
   * 检查部权限模块是否存在
   * @param parentId
   * @param aclModuleName
   * @param surrogateId
   * @return true/false
   */
  protected boolean checkAclModuleExist(Long parentId, String aclModuleName, Long surrogateId) {
    QueryWrapper<SysAclModule> query1 = new QueryWrapper<>();
    query1.eq("parent_id",parentId);
    if (Objects.nonNull(aclModuleName)) {
      query1.eq("name",aclModuleName);
    }
    if (Objects.nonNull(surrogateId)) {
      query1.eq("surrogate_id",surrogateId);
    }
    Long count = aclModuleMapper.selectCount(query1);
    if (count >= 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 获取当前权限模块所在层级的level
   * @param surrogateId
   * @return
   */
  private SysAclModule getParentAclModule(Long surrogateId) {
    QueryWrapper<SysAclModule> query = new QueryWrapper<>();
    query.eq("surrogate_id", surrogateId);
    SysAclModule aclModule = aclModuleMapper.selectOne(query);
    if (Objects.isNull(aclModule)) {
      return null;
    }
    return aclModule;
  }

  /**
   * 修改权限模块信息
   * @param req
   * @return
   */
  @Override
  public ApiResp<String> edit(AclModuleReq req) {
    /**
     * 检查权限模块名是否相同
     */
    QueryWrapper<SysAclModule> query2 = new QueryWrapper<>();
    query2.eq("surrogate_id", req.getSurrogateId());
    SysAclModule before = aclModuleMapper.selectOne(query2);
    if (Objects.isNull(before)) {
      return ApiResp.failure(INFO_NOT_EXIST);
    }

    String parentLevel = "";
    String parentName = "0";
    Long parentId = 0l;
    if (req.getParentSurrogateId() != 0) {
      Optional<SysAclModule> optionalSysAclModule = Optional.ofNullable(this.getParentAclModule(req.getParentSurrogateId()));
      if (!optionalSysAclModule.isPresent()) {
        return ApiResp.failure("父级权限模块不存在");
      }
      SysAclModule parentAclModule = optionalSysAclModule.get();
      parentLevel = parentAclModule.getLevel();
      parentId = parentAclModule.getId();
      parentName = parentAclModule.getName();
    }

    // 更新当前的权限模块
    SysAclModule after = SysAclModule.builder()
      .id(before.getId())
      .surrogateId(before.getSurrogateId())
      .name(req.getName())
      .parentId(req.getParentSurrogateId())
      .parentName(parentName)
      .seq(req.getSeq())
      .level(LevelUtil.calculateLevel(parentLevel, parentId))
      .menuUrl(StringUtils.isBlank(req.getMenuUrl()) ? "-" : req.getMenuUrl())
      .status(req.getStatus())
      .remark(req.getRemark())
      .updateTime(DateUtil.localDateTimeNow())
      .operator(RequestHolder.getCurrentUser().getSurrogateId())
      .operateIp("127.0.0.1")
      .build();

    // 更新子组织信息
    this.updateWithChildAclModule(before, after);
    return ApiResp.success(msgService.getMessage(LANG_ZH, "sys.acl.module.resp.msg3"));
  }


  /**
   * 更新当前权限模块的子权限模块信息
   * @param before 旧权限模块
   * @param after 新权限模块
   */
  @Transactional
  public void updateWithChildAclModule(SysAclModule before, SysAclModule after) {
    // 修改当前权限模块
    aclModuleMapper.updateById(after);

    // 更新当前权限模块的子权限模块
    String oldLevelPrefix = before.getLevel();// 0.1
    String newLevelPrefix = after.getLevel();// 0.1.3
    if (!newLevelPrefix.equals(oldLevelPrefix)) {// 不一致需要做子组织的更新
      this.updateChildAclModuleTree(after);
    }
  }

  /**
   * 递归变更组织树层级, 并维护子组织的 level
   * @param afterAclModule
   */
  protected void updateChildAclModuleTree(SysAclModule afterAclModule) {
    // 查询当前组织的子组织
    List<SysAclModule> aclModuleList = aclModuleMapper.selectChildAclModuleListByParentId(afterAclModule.getSurrogateId());

    if (CollectionUtils.isEmpty(aclModuleList)) {
      return;
    }

    aclModuleList.forEach(aclModule -> {
//			aclModule.setParentName(aclModule.getParentName());
      aclModule.setLevel(LevelUtil.calculateLevel(afterAclModule.getLevel(), afterAclModule.getId()));
      aclModule.setUpdateTime(DateUtil.localDateTimeNow());
      updateChildAclModuleTree(aclModule);
    });
    // 操作db
    this.updateBatchById(aclModuleList);
  }

  /**
   * 获取模块权限树
   *
   * @return
   */
  @Override
  public ApiResp<List<AclModuleDTO>> aclModuleTree() {
    List<AclModuleDTO> aclModuleDTOList = treeService.aclModuleTree();
    return ApiResp.success(aclModuleDTOList);
  }

  /**
   * 删除权限模块信息
   *
   * @return
   */
  @Override
  public ApiResp<String> delete(Long surrogateId) {
    QueryWrapper<SysAclModule> query = new QueryWrapper<>();
    query.eq("surrogate_id", surrogateId);
    SysAclModule aclModule = aclModuleMapper.selectOne(query);
    if (Objects.isNull(aclModule)) {
      return ApiResp.failure(msgService.getMessage(LANG_ZH, "sys.acl.module.resp.msg4"));
    }

    // 检查要删除的权限模块下是否还有子权限模块
    QueryWrapper<SysAclModule> query1 = new QueryWrapper<>();
    query1.eq("parent_id", surrogateId);
    Long count = aclModuleMapper.selectCount(query1);
    if (count >= 1) {
      return ApiResp.failure(msgService.getMessage(LANG_ZH, "sys.acl.module.resp.msg5"));
    }

    // 检查待删除的权限模块下是否还存在权限点(包括所有状态的权限点数量), 如存在将不能删除
    Long aclCount = aclService.getAclCountByAclModuleId(surrogateId);
    if (aclCount >= 1) {
      return ApiResp.failure(msgService.getMessage(LANG_ZH, "sys.acl.module.resp.msg6"));
    }

    aclModuleMapper.deleteById(aclModule.getId());
    return ApiResp.success(msgService.getMessage(LANG_ZH, "sys.acl.module.resp.msg7"));
  }

  /**
   * 获取单个权限模块对象
   * @param surrogateId
   * @return
   */
  @Override
  public ApiResp<SysAclModuleResp> getAclModule(Long surrogateId) {
    QueryWrapper<SysAclModule> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("surrogate_id", surrogateId);
    SysAclModule aclModule = aclModuleMapper.selectOne(queryWrapper);
    if (Objects.isNull(aclModule)) {
      return ApiResp.failure(INFO_NOT_EXIST);
    }
    SysAclModuleResp aclModuleVO = new SysAclModuleResp();
    BeanUtils.copyProperties(aclModule, aclModuleVO);
    return ApiResp.success(aclModuleVO);
  }

  /**
   * 查询所有的权限模块列表
   * @return
   */
  @Override
  public ApiResp<List<SysAclModuleResp>> list(AclModuleListReq req) {
    List<SysAclModuleResp> sysAclModules = aclModuleMapper.selectAclModuleList(req);
    return ApiResp.success(sysAclModules);
  }
}
