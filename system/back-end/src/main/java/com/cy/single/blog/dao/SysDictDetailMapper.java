package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysDictDetail;
import com.cy.single.blog.pojo.req.sys.dict.DictDetailPageListReq;
import com.cy.single.blog.pojo.resp.sys.dic.SysDictDetailResp;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/9
 * @Description:
 */
@Repository
public interface SysDictDetailMapper extends BaseMapper<SysDictDetail> {

  List<SysDictDetailResp> getDictDetailListByParentId(@Param("dictSurrogateId") Long dictSurrogateId);

  List<SysDictDetailResp> pageDictDetailListById(@Param("param") DictDetailPageListReq req);

  Integer countPageDictDetail(@Param("param") DictDetailPageListReq req);

  List<SysDictDetailResp> dictDetailList();
}
