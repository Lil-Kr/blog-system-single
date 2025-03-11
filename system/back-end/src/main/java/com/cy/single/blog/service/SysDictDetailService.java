package com.cy.single.blog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.req.dict.DictDetailPageListReq;
import com.cy.single.blog.pojo.req.dict.SaveDictDetailReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictDetailVO;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description:
 */
public interface SysDictDetailService extends IService<SysDictDetail> {

	ApiResp<String> addDetail(SaveDictDetailReq param);

	ApiResp<String> editDetail(SaveDictDetailReq param);

	ApiResp<String> deleteDetail(Long surrogateId);

	PageResult<SysDictDetailVO> pageDictDetailList(DictDetailPageListReq req);
}