package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.base.PageResult;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.enums.ReturnCodeEnum;
import com.cy.single.blog.pojo.dto.sys.user.UserDTO;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserListPageReq;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.req.user.UserRegisterReq;
import com.cy.single.blog.pojo.req.user.UserSaveReq;
import com.cy.single.blog.pojo.vo.sys.user.SysUserVO;
import com.cy.single.blog.service.SysUserService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import static com.cy.single.blog.common.constants.ResponseConstant.LOGIN_SUCCESS;
import static com.cy.single.blog.enums.ReturnCodeEnum.SAVE_ERROR;
import static com.cy.single.blog.enums.ReturnCodeEnum.USER_INFO_ERROR;
import static com.cy.single.blog.pojo.dto.sys.user.UserDTO.convertAddUserReq;

/**
 * @Author: Lil-K
 * @Date: 2025/3/6
 * @Description:
 */
@Service
@Slf4j
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

	@Autowired
	private SysUserMapper userMapper;

	@Override
	public ApiResp<String> add(UserSaveReq req) {
		SysUser user = convertAddUserReq(req);
		int insert = userMapper.insert(user);
		if (insert >= 1) {
			return ApiResp.success();
		} else {
			return ApiResp.failure(SAVE_ERROR);
		}
	}


	@Override
	public SysUser getUserById(Long id) {
		return userMapper.getUserById(id);
	}

	@Override
	public SysUser getUserBySurrogateId(Long surrogateId) {
		return userMapper.getUserBySurrogateId(surrogateId);
	}

	@Override
	public ApiResp<String> adminLogin(UserLoginAdminReq req) {
		SysUser user = userMapper.loginAdmin(req);
		if (Objects.isNull(user)) {
			return ApiResp.failure(USER_INFO_ERROR);
		}

		user.setUpdateTime(DateUtil.localDateTimeNow());
		Integer update = userMapper.updateUserBySurrogateId(user);
		if (update >= 1)
			return ApiResp.success(LOGIN_SUCCESS, user.getToken());
		else
			return ApiResp.failure();
	}

	/**
	 * register admin
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<Integer> registerAdmin(UserRegisterReq req) {
		SysUser admin = userMapper.getUserByAccount(req.getAccount());
		if (Objects.nonNull(admin)) {
			return ApiResp.failure(ReturnCodeEnum.INFO_NOT_EXIST);
		}

		SysUser user = UserDTO.convertSaveAdminReq(req);
		int count = userMapper.insert(user);
		if (count <= 0) {
			return ApiResp.failure(SAVE_ERROR);
		}

		return ApiResp.success(ReturnCodeEnum.SUCCESS);
	}

	@Override
	public PageResult<SysUserVO> pageUserList(UserListPageReq req) {
		List<SysUserVO> list =  userMapper.pageUserList(req);
		Integer count = userMapper.countUserList(req);
		if (CollectionUtils.isNotEmpty(list)) {
			return new PageResult<>(list, count);
		}else {
			return new PageResult<>(new ArrayList<>(0), 0);
		}
	}

}