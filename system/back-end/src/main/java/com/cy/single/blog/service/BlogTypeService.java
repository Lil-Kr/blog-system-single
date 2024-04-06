package com.cy.single.blog.service;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.pojo.req.blog.type.BlogTypePageReq;
import com.cy.single.blog.pojo.req.blog.type.BlogTypeReq;
import com.cy.single.blog.pojo.vo.blog.BlogTypeVO;

/**
 * @Author: Lil-K
 * @Date: 2024/4/6
 * @Description:
 */
public interface BlogTypeService {

    PageResult<BlogTypeVO> pageTypeList(BlogTypePageReq req);

    ApiResp<String> save(BlogTypeReq req);

    ApiResp<String> edit(BlogTypeReq req);

    ApiResp<String> delete(Long surrogateId);

    ApiResp<String> deleteBatch(BlogTypeReq req);
}
