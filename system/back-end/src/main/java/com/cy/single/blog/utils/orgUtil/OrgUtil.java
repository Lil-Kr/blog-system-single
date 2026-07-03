package com.cy.single.blog.utils.orgUtil;


import com.cy.single.blog.pojo.dto.sys.org.OrgLevelDTO;
import com.cy.single.blog.pojo.entity.sys.SysOrg;

import java.util.Comparator;

public class OrgUtil {

  /**
   * 以OrgLevelDto排序, 组织列表根据seq排序
   */
  public static Comparator<OrgLevelDTO> orgLevelDtoComparator = new Comparator<OrgLevelDTO>() {
    @Override
    public int compare(OrgLevelDTO o1, OrgLevelDTO o2) {
      return o1.getSeq() - o2.getSeq();
    }
  };

  /**
   * 以SysOrg排序
   */
  public static Comparator<SysOrg> orgComparator = new Comparator<SysOrg>() {
    @Override
    public int compare(SysOrg o1, SysOrg o2) {
      return o1.getSeq() - o2.getSeq();
    }
  };

  /**
   * 以SysOrg排序
   */
  public static Comparator<SysOrg> orgByIdComparator = new Comparator<SysOrg>() {
    @Override
    public int compare(SysOrg o1, SysOrg o2) {
      return (int) (o1.getId() - o2.getId());
    }
  };
}
