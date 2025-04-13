package com.cy.single.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.req.dict.DictDetailReq;
import com.cy.single.blog.pojo.req.dict.DictListPageReq;
import com.cy.single.blog.pojo.req.dict.DictSaveReq;
import com.cy.single.blog.pojo.resp.sys.dic.SysDictDetailResp;
import com.cy.single.blog.pojo.resp.sys.dic.SysDictResp;

import java.util.List;
import java.util.Map;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
public interface SysDictService extends IService<SysDict> {

	ApiResp<String> add(DictSaveReq req);

	ApiResp<String> edit(DictSaveReq req);

	PageResult<SysDictResp> listAll();

	ApiResp<SysDictResp> dictDetail(DictDetailReq req);

	SysDictResp getDict(Long surrogateId);

	PageResult<SysDictResp> pageList(DictListPageReq req);

	ApiResp<String> delete(Long surrogateId);

	ApiResp<Map<String, List<SysDictDetailResp>>> dictDetailMapping();
}