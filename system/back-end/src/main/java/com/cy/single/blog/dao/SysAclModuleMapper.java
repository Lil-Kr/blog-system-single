package com.cy.single.blog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-24
 */
public interface SysAclModuleMapper extends BaseMapper<SysAclModule> {

    List<SysAclModule> selectChildAclModuleListByParentId(@Param("parentId") Long surrogateId);
}
