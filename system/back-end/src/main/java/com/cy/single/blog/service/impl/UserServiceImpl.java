package com.cy.single.blog.service.impl;

import com.cy.single.blog.base.ApiResp;
import com.cy.single.blog.dao.SysUserMapper;
import com.cy.single.blog.enums.ReturnCodeEnum;
import com.cy.single.blog.pojo.dto.req.UserDTO;
import com.cy.single.blog.pojo.entity.SysUser;
import com.cy.single.blog.pojo.req.user.UserLoginAdminReq;
import com.cy.single.blog.pojo.req.user.UserRegisterReq;
import com.cy.single.blog.service.SysUserService;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static com.cy.single.blog.enums.ReturnCodeEnum.USER_INFO_ERROR;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
@Service
@Slf4j
public class UserServiceImpl implements SysUserService {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Override
    public SysUser getUserById(Long id) {
        return sysUserMapper.getUserById(id);
    }

    @Override
    public SysUser getUserBySurrogateId(Long surrogateId) {
        return sysUserMapper.getUserBySurrogateId(surrogateId);
    }

    @Override
    public ApiResp<String> adminLogin(UserLoginAdminReq reqParam) {
        SysUser user = sysUserMapper.getUserByAccount(reqParam.getAccount());
        if (Objects.isNull(user)){
            return ApiResp.failure(USER_INFO_ERROR);
        }

        user.setUpdateTime(DateUtil.getNowDateTime());
        sysUserMapper.updateUserById(user);
        return ApiResp.success("登陆成功", user.getToken());
    }

    /**
     * register admin
     * @param req
     * @return
     */
    @Override
    public ApiResp<Integer> registerAdmin(UserRegisterReq req) {
        SysUser admin = sysUserMapper.getUserByAccount(req.getAccount());
        if (Objects.nonNull(admin)) {
            return ApiResp.failure(ReturnCodeEnum.USER_INFO_EXIST);
        }

        SysUser user = UserDTO.convertSaveAdminReq(req);

        int count = sysUserMapper.insert(user);
        if (count <= 0) {
            return ApiResp.failure("新增用户失败");
        }

        return ApiResp.success(ReturnCodeEnum.SUCCESS);
    }

}
