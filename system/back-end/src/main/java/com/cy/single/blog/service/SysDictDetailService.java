package com.cy.single.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.req.dict.DictListPageReq;
import com.cy.single.blog.pojo.req.dict.DictSaveDetailReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictDetailVo;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
public interface SysDictDetailService extends IService<SysDictDetail> {

	ApiResp<String> addDetail(DictSaveDetailReq param);

	ApiResp<String> editDetail(DictSaveDetailReq param);

	ApiResp<String> deleteDetail(Long surrogateId);

	PageResult<SysDictDetailVo> pageDictList(DictListPageReq param);
}