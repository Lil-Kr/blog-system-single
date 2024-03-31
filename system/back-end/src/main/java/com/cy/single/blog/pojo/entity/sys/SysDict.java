package com.cy.single.blog.pojo.entity.sys;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.*;

/**
 * <p>
 * 数据字典实体
 * </p>
 *
 * @author Lil-Kr
 * @since 2020-11-29
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sys_dict")
public class SysDict extends Model<SysDict> {

    private static final long serialVersionUID = 1L;

    /**
     * 自增主键
     */
      @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 数据字典id唯一主键
     */
    private Long surrogateId;

    /**
     * 数据字典名称
     */
    private String name;

    /**
     * 备注
     */
    private String remark;

    /**
     * 删除状态, 0正常, 1删除
     */
    private Integer deleted;

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
    private String  updateTime;

}
