package com.cy.single.blog.pojo.resp.sys.dic;

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
public class SysDictResp extends SysDict {
	private List<SysDictDetailResp> dictDetailVOList;
}