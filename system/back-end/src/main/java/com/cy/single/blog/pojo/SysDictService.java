package com.cy.single.blog.pojo;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.req.dict.DictDetailReq;
import com.cy.single.blog.pojo.req.dict.DictListPageReq;
import com.cy.single.blog.pojo.req.dict.DictSaveReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictVO;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
public interface SysDictService extends IService<SysDict> {

	ApiResp<String> add(DictSaveReq req);

	ApiResp<String> edit(DictSaveReq req);

	PageResult<SysDictVO> listAll();

	ApiResp<SysDictVO> dictDetail(DictDetailReq req);

	SysDictVO getDict(Long surrogateId);

	PageResult<SysDictVO> pageDictList(DictListPageReq req);

	ApiResp<String> delete(Long surrogateId);
}