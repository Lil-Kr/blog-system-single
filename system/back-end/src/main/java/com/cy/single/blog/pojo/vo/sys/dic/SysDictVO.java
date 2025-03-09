package com.cy.single.blog.pojo.vo.sys.dic;

import com.cy.single.blog.pojo.entity.sys.SysDict;
import lombok.Data;
import lombok.ToString;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: dict
 */
@ToString
@Data
public class SysDictVO extends SysDict {
	private List<SysDictDetailVO> dictDetailVOList;
}