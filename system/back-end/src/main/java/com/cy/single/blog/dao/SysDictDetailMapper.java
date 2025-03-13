package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.req.dict.DictDetailPageListReq;
import com.cy.single.blog.pojo.vo.sys.dic.SysDictDetailVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/9
 * @Description:
 */
public interface SysDictDetailMapper extends BaseMapper<SysDictDetail> {

	List<SysDictDetailVO> getDictDetailListByParentId(@Param("dictSurrogateId") Long dictSurrogateId);

	List<SysDictDetailVO> pageDictDetailListById(@Param("param") DictDetailPageListReq req);

	Integer countPageDictDetail(@Param("param") DictDetailPageListReq req);

	List<SysDictDetailVO> dictDetailTree();
}
