package com.cy.single.blog.dao;

import com.cy.single.blog.pojo.entity.sys.SysAclData;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * SysAclDataMapper继承基类
 */
@Repository
public interface SysAclDataMapper {

	List<SysAclData> selectAclDataListByAclIds(@Param("aclList") List<Long> aclList);
}