package com.cy.single.blog.pojo.entity;

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
@EqualsAndHashCode(of = {"surrogateId"})
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@TableName("sys_acl")
public class SysAcl extends Model<SysAcl> {

    private static final long serialVersionUID = 1L;

    /**
     * 自增主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 权限id唯一主键
     */
    private Long surrogateId;

    /**
     * 权限编码
     */
    private String number;

    /**
     * 权限名
     */
    private String name;

    /**
     * 权限模块id
     */
    private Long aclModuleId;

    /**
     * 请求的url
     */
    private String url;

    /**
     * 1:菜单权限, 2按钮, 3其他
     */
    private Integer type;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 排序
     */
    private Integer seq;

    /**
     * 备注
     */
    private String remark;

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
