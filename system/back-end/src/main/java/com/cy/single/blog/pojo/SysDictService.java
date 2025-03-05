package com.cy.single.blog.pojo;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.req.dict.DictSaveReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictVo;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
public interface SysDictService extends IService<SysDict> {

	ApiResp<String> add(DictSaveReq param);

	ApiResp<String> edit(DictSaveReq param);

	PageResult<SysDictVo> listAll();
}