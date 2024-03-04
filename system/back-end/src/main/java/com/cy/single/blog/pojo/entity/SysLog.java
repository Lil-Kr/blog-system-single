package com.cy.single.blog.pojo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("sys_log")
public class SysLog extends Model<SysLog> {

    private static final long serialVersionUID = 1L;

    /**
     * 自增主键
     */
      @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 日志id,唯一主键
     */
    private Long surrogateId;

    /**
     * 1组织，2用户，3权限模块, 4权限， 5角色, 6角色用户关系, 7角色权限关系
     */
    private Integer type;

    /**
     * 各个模块的主键id, 涉及到关联关系的操作存放的是角色id
     */
    private Long targetId;

    /**
     * 更新前的值
     */
    private String oldValue;

    /**
     * 更新后的值
     */
    private String newValue;

    /**
     * 状态, 当前是否复原过, 0没有, 1复原过
     */
    private Integer status;

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
