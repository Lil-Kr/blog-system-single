package com.cy.single.blog.pojo.req.sys.user;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2025/3/7
 * @Description:
 */
@Data
@ToString
public class UserListPageReq extends BasePageReq implements Serializable {
	private static final long serialVersionUID = -7150741731821687984L;

	private Long surrogateId;

	/**
	 * 姓名
	 */
	private String userName;

	/**
	 * 电话
	 */
	private String telephone;

	/**
	 * 邮箱
	 */
	private String mail;

	/**
	 * 用户所在组织id
	 */
	private Long orgId;

	/**
	 * 状态, 0正常, 1冻结, 2: 删除
	 */
	private Integer status = 0;

	/**
	 * 备注
	 */
	private String remark;

	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 更改时间
	 */
	private Date updateTime;

}
