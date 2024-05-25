package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogCategory;
import com.cy.single.blog.pojo.req.blog.category.BlogCategoryPageReq;
import com.cy.single.blog.pojo.vo.blog.BlogCategoryVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-K
 * @since 2024-03-31
 */
public interface BlogCategoryMapper extends BaseMapper<BlogCategory> {

    Integer editBySurrogateId(@Param("param") BlogCategory req);

    BlogCategory selectBySurrogateId(Long surrogateId);

    BlogCategory selectByNumber(String Number);

    List<BlogCategoryVO> pageCategoryList(@Param("param") BlogCategoryPageReq req);

    List<BlogCategoryVO> categoryList(@Param("param") BlogCategoryPageReq req);

    Integer getCountByList(@Param("param") BlogCategoryPageReq req);

    Integer deleteBySurrogateId(Long surrogateId);

    Integer deleteBatch(List<Long> surrogateIds);
}
