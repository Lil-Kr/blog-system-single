package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.req.dict.DictListPageReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-29
 */
public interface SysDictMapper extends BaseMapper<SysDict> {

	SysDictVO getDict(@Param("surrogateId") Long surrogateId);

	List<SysDictVO> pageDictList(@Param("param") DictListPageReq req);

	Integer countPageDict(@Param("param") DictListPageReq req);
}
