package com.cy.single.blog.pojo.dto.sys.user;

import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserRegisterReq;
import com.cy.single.blog.pojo.req.user.UserSaveReq;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2025/3/7
 * @Description:
 */
public class UserDTO {

	private static final String ACCOUNT_RANDOM = "blog-";

	/**
	 * request param convert to save admin object
	 * @param baseReq
	 * @return
	 */
	public static SysUser convertSaveAdminReq(UserRegisterReq baseReq) {
		SysUser req = SysUser.builder().build();
		BeanUtils.copyProperties(baseReq, req);

		req.setSurrogateId(IdWorker.getSnowFlakeId());
		req.setOperator(RequestHolder.getCurrentUser().getSurrogateId());

		Date nowDateTime = DateUtil.localDateTimeNow();
		req.setCreateTime(nowDateTime);
		req.setUpdateTime(nowDateTime);
		req.setToken(IdWorker.generateUUID());

		return req;
	}


	public static SysUser convertAddUserReq(UserSaveReq req) {
		SysUser build = SysUser.builder().build();
		BeanUtils.copyProperties(build, req);

		if (StringUtils.isBlank(req.getAccount()))
			build.setAccount(ACCOUNT_RANDOM + IdWorker.generateUUID());

		build.setSurrogateId(IdWorker.getSnowFlakeId());
		build.setToken(IdWorker.generateUUID());

		build.setCreatorId(RequestHolder.getCurrentUser().getSurrogateId());
		build.setOperator(RequestHolder.getCurrentUser().getSurrogateId());
		build.setOperateIp("0.0.0.0");
		build.setDeleted(0);

		Date nowDateTime = DateUtil.localDateTimeNow();
		build.setCreateTime(nowDateTime);
		build.setUpdateTime(nowDateTime);
		return build;
	}
}
