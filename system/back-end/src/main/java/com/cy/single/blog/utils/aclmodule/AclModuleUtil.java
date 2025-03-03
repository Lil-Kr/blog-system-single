package com.cy.single.blog.utils.aclmodule;

import com.cy.single.blog.pojo.dto.aclmodule.AclModuleDto;
import com.cy.single.blog.pojo.entity.sys.SysAclModule;

import java.util.Comparator;

public class AclModuleUtil {

    /**
     * 以SysAclModule排序, 组织列表根据seq排序
     */
    public static Comparator<AclModuleDto> aclModuleLevelDtoComparator = new Comparator<AclModuleDto>() {
        @Override
        public int compare(AclModuleDto o1, AclModuleDto o2) {
            return o1.getSeq() - o2.getSeq();
        }
    };

    /**
     * 根据顺序(seq)SysAclModule排序
     */
    public static Comparator<SysAclModule> aclModuleComparator = new Comparator<SysAclModule>() {
        @Override
        public int compare(SysAclModule o1, SysAclModule o2) {
            return o1.getSeq() - o2.getSeq();
        }
    };

    /**
     * 根据Id SysAclModule排序
     */
    public static Comparator<SysAclModule> aclModuleByIdComparator = new Comparator<SysAclModule>() {
        @Override
        public int compare(SysAclModule o1, SysAclModule o2) {
            return (int) (o1.getId() - o2.getId());
        }
    };
}
