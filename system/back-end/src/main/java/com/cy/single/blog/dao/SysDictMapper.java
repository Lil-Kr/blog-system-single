package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysDict;
import com.cy.single.blog.pojo.req.dict.DictListPageReq;
import com.cy.single.blog.pojo.resp.sys.dic.SysDictResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-29
 */
@Repository
public interface SysDictMapper extends BaseMapper<SysDict> {

  SysDictResp getDict(@Param("surrogateId") Long surrogateId);

  List<SysDictResp> pageDictList(@Param("param") DictListPageReq req);

  Integer countPageDict(@Param("param") DictListPageReq req);

  List<SysDict> selectDictList();

}
