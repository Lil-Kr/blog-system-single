package com.cy.single.blog.pojo.resp.sys.role;

import com.cy.single.blog.pojo.resp.sys.user.SysUserResp;
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
public class RoleUserResp implements Serializable {

	private static final long serialVersionUID = 7237593845976133220L;

	private List<SysUserResp> selectedUserList;

	private List<SysUserResp> unSelectedUserList;
}