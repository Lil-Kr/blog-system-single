package com.cy.single.blog.utils.orgUtil;

import org.apache.commons.lang3.StringUtils;

/**
 * @Author: Lil-K
 * @Date: 2025/3/10
 * @Description:
 */
public class LevelUtil {

  public final static String SEPARATOR = ".";

  public final static String ROOT = "0";

  /**
   * 计算层级
   * 当前层级 = 上级id + 上级level
   * @param parentLevel 上一级组织的层级
   * @param id 上一级组织的id
   * @return
   */
  public static String calculateLevel(String parentLevel, Long id){// 0 1
    if (StringUtils.isBlank(parentLevel) || "-1".equals(parentLevel)) {// 返回首层code, 0
      return ROOT;
    }else {
      return StringUtils.join(parentLevel, SEPARATOR, id);
    }
  }
}
