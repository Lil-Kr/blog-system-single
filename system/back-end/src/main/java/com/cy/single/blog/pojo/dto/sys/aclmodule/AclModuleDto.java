package com.cy.single.blog.pojo.dto.sys.aclmodule;

import com.cy.single.blog.pojo.dto.sys.acl.AclDto;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.common.collect.Lists;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

import java.util.List;

/**
 * <p>
 *  权限模块Dto
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-26
 */
@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AclModuleDto extends SysAclModule {

    private List<AclModuleDto> aclModuleDtoList = Lists.newArrayList();

    /**
     * 权限点数据
     */
    private List<AclDto> aclDtoList = Lists.newArrayList();

    /**
     * 将权限模块数据转换为一颗树形结构
     * @return
     */
    public static AclModuleDto adapt(SysAclModule aclModule){
        AclModuleDto dto = new AclModuleDto();
        BeanUtils.copyProperties(aclModule,dto);
        return dto;
    }
}
