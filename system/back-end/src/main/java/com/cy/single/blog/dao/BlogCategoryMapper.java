package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogCategory;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.resp.blog.BlogCategoryResp;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/28
 * @Description:
 */
public interface BlogCategoryMapper extends BaseMapper<BlogCategory> {

	Integer editBySurrogateId(@Param("param") BlogCategory req);

	BlogCategory selectBySurrogateId(Long surrogateId);

	BlogCategory selectByNumber(String Number);

	List<BlogCategoryResp> pageCategoryList(@Param("param") BlogCategoryPageReq req);

	List<BlogCategoryResp> categoryList(@Param("param") BlogCategoryPageReq req);

	Integer getCountByList(@Param("param") BlogCategoryPageReq req);

	Integer deleteBySurrogateId(Long surrogateId);

	Integer deleteBatch(List<Long> surrogateIds);

	List<BlogCategoryResp> frontList();
}
