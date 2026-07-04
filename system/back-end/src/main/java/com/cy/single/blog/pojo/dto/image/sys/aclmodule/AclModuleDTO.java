package com.cy.single.blog.pojo.dto.image.sys.aclmodule;

import com.cy.single.blog.pojo.dto.image.sys.acl.AclDTO;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.common.collect.Lists;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

import java.util.List;

/**
 * <p>
 *  权限模块Dto
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-26
 */
@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AclModuleDTO extends SysAclModule {

  private static final long serialVersionUID = -6784284251265166210L;

  private List<AclModuleDTO> aclModuleDTOList = Lists.newArrayList();

  /**
   * 权限点数据
   */
  private List<AclDTO> aclDTOList = Lists.newArrayList();

  /**
   * 将权限模块数据转换为一颗树形结构
   * @return
   */
  public static AclModuleDTO adapt(SysAclModule aclModule){
    AclModuleDTO dto = new AclModuleDTO();
    BeanUtils.copyProperties(aclModule, dto);
    return dto;
  }
}
