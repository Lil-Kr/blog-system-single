package com.cy.single.blog.pojo.dto.req;

import com.cy.single.blog.pojo.entity.sys.SysUser;
import com.cy.single.blog.pojo.req.user.UserRegisterReq;
import com.cy.single.blog.utils.dateUtil.DateUtil;
import com.cy.single.blog.utils.keyUtil.IdWorker;
import org.springframework.beans.BeanUtils;

/**
 * @Author: Lil-K
 * @Date: 2024/3/17
 * @Description:
 */
public class UserDTO {

    /**
     * request param convert to save admin object
     * @param baseReq
     * @return
     */
    public static SysUser convertSaveAdminReq(UserRegisterReq baseReq) {
        SysUser req = SysUser.builder().build();
        BeanUtils.copyProperties(baseReq, req);

        req.setSurrogateId(IdWorker.getSnowFlakeId());
        req.setOperator(baseReq.getAccount());

        String nowDateTime = DateUtil.getNowDateTime();
        req.setCreateTime(nowDateTime);
        req.setUpdateTime(nowDateTime);
        req.setToken(IdWorker.generateUUID());

        return req;
    }

}
