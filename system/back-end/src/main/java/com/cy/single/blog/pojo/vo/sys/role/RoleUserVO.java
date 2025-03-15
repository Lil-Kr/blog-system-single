package com.cy.single.blog.pojo.vo.sys.role;

import com.cy.single.blog.pojo.vo.sys.user.SysUserVO;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2025/3/15
 * @Description:
 */
@ToString
@Data
@Builder
public class RoleUserVO implements Serializable {

	private static final long serialVersionUID = 7237593845976133220L;

	private List<SysUserVO> selectedUserList;

	private List<SysUserVO> unSelectedUserList;
}