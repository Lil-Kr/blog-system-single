package com.cy.single.blog.pojo.entity.sys;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.io.Serializable;

/**
 * @Author: Lil-K
 * @Date: 2025/4/2
 * @Description: 数据权限表
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@TableName("sys_acl_data")
public class SysAclData extends Model<SysAclData> implements Serializable {

	private static final long serialVersionUID = -5161750572898339332L;

	private Long id;

	/**
	 * 对应权限表主键
	 */
	private Long aclId;

	/**
	 * 状态，0：可用，1：不可用
	 */
	private Integer status;

	/**
	 * 参数
	 */
	private String param;

	/**
	 * 操作类型，0；等于，1：大于，2：小于，3：大于等于，4：小于等于，5：包含，6：介于之间，。。。
	 */
	private Integer operation;

	private String value1;

	private String value2;

	/**
	 * 后续有参数时连接的关系，0:没有其他参数控制，1：与&&，2：或||
	 */
	private Integer nextParamOp;

	/**
	 * 顺序
	 */
	private Integer seq;

	private String remark;
}
