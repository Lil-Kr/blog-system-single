package com.cy.single.blog.api.sys;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: Lil-K
 * @Date: 2025/4/2
 * @Description: 数据权限 api
 *
 * 1. 新增数据权限时: 限制 param 字段 只能填一个
 * 2. 如果增加配置, value1 字段不能为空
 * 3. nextParamOp 不填写默认为 0
 *
 * 数据权限两种模式配置:
 *  说明:
 *    使用 sys_acl_data 表结构进行控制数据, 比如: 某些 [角色] 或 [组织] 可以访问,
 *    细粒度: 利用这张表, 配置 [新增] 时的规则(指定哪些user, 哪些组织, 哪些角色可以访问), 同时需要业务数据表中添加 user_id, org_id, role_id 等字段
 *    粗粒度: 同理, 也可以只需要配置粗粒度的权限控制, 比如 某个角色 或 某个 组织可以访问
	 *    1.1 配置细粒度 --> 需要拼接 sql, 用 in 的方式拼接
	 *    1.2 配置粗粒度 --> 不需要拼接sql, 直接判断有无权限访问即可, (有权限就能查询所有数据, 否则都不能查询)
 *        1.2.1 比如博客列表查询, 通常业务只允许博客的拥有者 + 博客管理员(角色)可以访问和管理
 *        1.2.2 如果一个博客列表指定某些user可以访问, 就需要在博客表中添加 user_id 字段, 查询时通过拼接sql 关联查询
 *
 */
@RestController
@RequestMapping("/sys/acldata")
@Slf4j
public class AclDataController {

}
