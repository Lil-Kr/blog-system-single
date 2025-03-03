package com.cy.single.blog.pojo.dto.org;

import com.cy.single.blog.pojo.entity.sys.SysOrg;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.common.collect.Lists;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrgLevelDto extends SysOrg {

    private Long parentSurrogateId;

    private List<OrgLevelDto> orgList = Lists.newArrayList();

    /**
     * 将组织数据转换为一颗树形结构
     * @param org
     * @return
     */
    public static OrgLevelDto adapt(SysOrg org){
        OrgLevelDto dto = new OrgLevelDto();
        BeanUtils.copyProperties(org,dto);
        return dto;
    }


}
