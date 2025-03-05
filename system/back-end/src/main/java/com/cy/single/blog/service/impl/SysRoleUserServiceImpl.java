package com.cy.single.blog.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.common.holder.RequestHolder;
import com.cy.single.blog.dao.SysRoleUserMapper;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.pojo.entity.sys.SysRoleUser;
import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.roleuser.RoleUserReq;
import com.cy.single.blog.service.SysRoleUserService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import com.google.common.base.Splitter;
import com.google.common.collect.Sets;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.cy.single.blog.enums.ReturnCodeEnum.INFO_NOT_EXIST;

/**
 * @Author: Lil-K
 * @Date: 2025/3/5
 * @Description: role-user relation service
 */
@Service
@Slf4j
public class SysRoleUserServiceImpl extends ServiceImpl<SysRoleUserMapper, SysRoleUser> implements SysRoleUserService {

	@Autowired
	private SysRoleUserMapper roleUserMapper;

	@Autowired
	private SysUserMapper userMapper;

	@Override
	public ApiResp<String> updateRoleUsers(RoleUserReq param) {
		// 根据角色id查询分配的用户id
		List<Long> originUserIdList = new ArrayList<>(roleUserMapper.selectUserIdListByRoleId(param.getRoleId()));
		if (CollectionUtils.isEmpty(originUserIdList)) {
			return ApiResp.failure("当前角色未分配用户");
		}

		// 将需要修改的角色id转为 -> list
		List<Long> userIdList = Splitter.on(",").trimResults().omitEmptyStrings().splitToList(param.getUserIds())
			.stream()
			.map(roleId -> Long.valueOf(roleId))
			.collect(Collectors.toList());
		if (CollectionUtils.isEmpty(userIdList)) {
			return ApiResp.failure("待更新的用户id为空");
		}

		if (originUserIdList.size() == userIdList.size()) {
			Set<Long> originUserIdSet = Sets.newHashSet(originUserIdList);
			Set<Long> userIdSet = Sets.newHashSet(userIdList);
			originUserIdSet.removeAll(userIdSet);
			if (CollectionUtils.isEmpty(originUserIdSet)) {
				return ApiResp.failure("待更新的用户信息与原来一致");
			}
		}

		// 更新角色-用户信息
		updateRoleUsers(param.getRoleId(), userIdList);
		return ApiResp.success("更新用户角色信息成功");
	}

	/**
	 * 更新角色-用户信息
	 * @param roleId
	 * @param userIdList
	 */
	@Transactional
	public void updateRoleUsers(Long roleId, List<Long> userIdList) {
		// 删除原来角色分配的用户的对应关系数据
		QueryWrapper<SysRoleUser> delete = new QueryWrapper<>();
		delete.eq("role_id",roleId);
		roleUserMapper.delete(delete);

		Date currentTime = DateUtil.localDateTimeNow();
		List<SysRoleUser> roleUsers = userIdList.stream()
			.map(userId -> {
				return SysRoleUser.builder()
					.surrogateId(IdWorker.getSnowFlakeId())
					.roleId(roleId)
					.userId(userId)
					.operateIp("127.0.0.1")
					.operator(RequestHolder.getCurrentUser().getSurrogateId())
					.createTime(currentTime)
					.updateTime(currentTime)
					.build();
			})
			.collect(Collectors.toList());

		// 批量更新角色-用户信息
		this.saveBatch(roleUsers);
	}

	/**
	 * 角色用户[待选列表-已选列表]
	 * @param req
	 * @return
	 */
	@Override
	public ApiResp<Map<String, List<SysUser>>> roleUserList(RoleUserReq req) {
		List<Long> userIdList = roleUserMapper.selectUserIdListByRoleId(req.getRoleId());

		if (CollectionUtils.isEmpty(userIdList)) {
			return ApiResp.failure(INFO_NOT_EXIST);
		}

		// 查询角色锁分配之后的用户信息
		QueryWrapper<SysUser> query1 = new QueryWrapper<>();
		query1.in("surrogate_id",userIdList);
		List<SysUser> roleUserList = userMapper.selectList(query1);

		// 查询所有的用户信息, 筛选出用户待选列表
		QueryWrapper<SysUser> query2 = new QueryWrapper<>();
//		query2.eq("status", 0);// 未删除的用户
//		query2.eq("deleted",0);// 正常用户信息
		List<SysUser> userAllList = userMapper.selectList(query2);
		userAllList.removeAll(roleUserList);

		HashMap<String, List<SysUser>> roleUserMap = new HashMap<>();
		roleUserMap.put("selectedUserList", roleUserList);
		roleUserMap.put("unSelectedUserList", userAllList);
		return ApiResp.success(roleUserMap);
	}
}
