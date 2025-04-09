package com.cy.single.blog.pojo.dto.sys.acl;

import com.cy.single.blog.pojo.entity.sys.SysAcl;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

@Data
@ToString
public class AclDto extends SysAcl {

  /**
   * 前端是否默认要选中的样式
   */
  private boolean checked = false;

  /**
   * 是否有权限操作
   * 一个用户在分配权限时, 是不能超过当前分配已有权限的上线
   */
  private boolean hasAcl = false;

  public static AclDto adapt(SysAcl acl) {
    AclDto aclDto = new AclDto();
    BeanUtils.copyProperties(acl,aclDto);
    return aclDto;
  }
}
