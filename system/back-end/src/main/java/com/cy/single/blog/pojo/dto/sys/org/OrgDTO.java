package com.cy.single.blog.pojo.dto.sys.org;

import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.cy.single.blog.pojo.req.sys.org.OrgReq;
import lombok.Data;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;

@Slf4j
@Data
@ToString
public class OrgDTO extends SysOrg {

  private static final long serialVersionUID = 1180678072393662676L;

  /**
   * 参数转换为实体类
   * @param param
   * @return
   */
  public static SysOrg paramToSysOrg(OrgReq param) {
    SysOrg org = SysOrg.builder().build();
    BeanUtils.copyProperties(param,org);
    return org;
  }

  public static SysOrg paramToSysOrg(SysOrg param) {
    SysOrg org = SysOrg.builder().build();
    BeanUtils.copyProperties(param,org);
    return org;
  }
}
