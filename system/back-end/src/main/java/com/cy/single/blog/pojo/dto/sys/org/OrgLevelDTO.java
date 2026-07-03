package com.cy.single.blog.pojo.dto.sys.org;

import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.common.collect.Lists;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrgLevelDTO extends SysOrg {

  private static final long serialVersionUID = 1088282432860495565L;

  private Long parentSurrogateId;

  private List<OrgLevelDTO> orgList = Lists.newArrayList();

  /**
   * 将组织数据转换为一颗树形结构
   * @param org
   * @return
   */
  public static OrgLevelDTO adapt(SysOrg org){
    OrgLevelDTO dto = new OrgLevelDTO();
    BeanUtils.copyProperties(org,dto);
    return dto;
  }
}
