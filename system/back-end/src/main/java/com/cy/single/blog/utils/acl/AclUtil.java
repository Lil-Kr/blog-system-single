package com.cy.single.blog.utils.acl;


import com.cy.single.blog.pojo.dto.image.sys.acl.AclDTO;

import java.util.Comparator;

/**
 * @Description:
 * @Author: Lil-Kr
 * @Date: 2020/12/1
 */
public class AclUtil {

  /**
   * 以AclDto排序, 权限点列表根据seq排序
   */
  public static Comparator<AclDTO> aclDtoComparator = new Comparator<AclDTO>() {
    @Override
    public int compare(AclDTO o1, AclDTO o2) {
      return o1.getSeq() - o2.getSeq();
    }
  };
}
