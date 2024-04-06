package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.blog.BlogType;
import com.cy.single.blog.pojo.req.blog.type.BlogTypePageReq;
import com.cy.single.blog.pojo.vo.blog.BlogTypeVO;
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
public interface BlogTypeMapper extends BaseMapper<BlogType> {

    Integer editBySurrogateId(@Param("param") BlogType req);

    BlogType selectBySurrogateId(Long surrogateId);

    List<BlogTypeVO> pageTypeList(@Param("param") BlogTypePageReq req);

    Integer getCountByList(@Param("param") BlogTypePageReq req);

    Integer deleteBySurrogateId(Long surrogateId);

    Integer deleteBatch(List<Long> surrogateIds);
}
