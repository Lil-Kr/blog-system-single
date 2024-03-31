package com.cy.single.blog.pojo.entity.sys;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-26
 */
@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@TableName("sys_role_acl")
public class SysRoleAcl extends Model<SysRoleAcl> {

    private static final long serialVersionUID = 1L;

    /**
     * 自增主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 角色-权限id唯一主键
     */
    private Long surrogateId;

    /**
     * 角色id
     */
    private Long roleId;

    /**
     * 权限id
     */
    private Long aclId;

    /**
     * 操作人
     */
    private String operator;

    /**
     * 操作ip
     */
    private String operateIp;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 更改时间
     */
    private String updateTime;

}
