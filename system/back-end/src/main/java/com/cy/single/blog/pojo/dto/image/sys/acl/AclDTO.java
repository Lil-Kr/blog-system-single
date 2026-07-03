package com.cy.single.blog.pojo.dto.image.sys.acl;

import com.cy.single.blog.pojo.entity.sys.SysAcl;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

@Data
@ToString
public class AclDTO extends SysAcl {

  private static final long serialVersionUID = -7446367187879726851L;

  /**
   * 前端是否默认要选中的样式
   */
  private boolean checked = false;

  /**
   * 是否有权限操作
   * 一个用户在分配权限时, 是不能超过当前分配已有权限的上线
   */
  private boolean hasAcl = false;

  public static AclDTO adapt(SysAcl acl) {
    AclDTO aclDto = new AclDTO();
    BeanUtils.copyProperties(acl,aclDto);
    return aclDto;
  }
}
