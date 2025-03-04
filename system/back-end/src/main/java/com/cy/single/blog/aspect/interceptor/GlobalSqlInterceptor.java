package com.cy.single.blog.aspect.interceptor;

import com.alibaba.fastjson2.JSONObject;
import com.cy.single.blog.base.BasePageReq;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.util.Map;
import java.util.Properties;

/**
 * @Author: Lil-K
 * @Date: 2024/4/4
 * @Description: sql Interceptor for mybatis
 */
@Slf4j
@Component
@Intercepts({@Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class, Integer.class})})
public class GlobalSqlInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        log.info("==== sql intercept======");
        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();

        BoundSql boundSql = statementHandler.getBoundSql();

        MetaObject metaObject = SystemMetaObject.forObject(statementHandler);
        MappedStatement mappedStatement = (MappedStatement)metaObject.getValue("delegate.mappedStatement");

        /**
         * 判断sql 是否为 select 查询
         */
        if (!SqlCommandType.SELECT.equals(mappedStatement.getSqlCommandType())) {
            return invocation.proceed();
        }

        /**
         * 获取参数
         */
        Object[] args = invocation.getArgs();

        /**
         * 获取执行方法的位置 -> 绝对路径
         * com.cy.single.blog.dao.SysUserMapper.getUserByToken
         */
        String namespace = mappedStatement.getId();

        /**
         * 获取 mapper 的名称
         */
        String className = namespace.substring(0, namespace.lastIndexOf("."));
        log.info("sql intercept className: {}", className);

        /**
         * 获取调用 mapper 的方法名
         */
        String methodName = namespace.substring(namespace.lastIndexOf(".") + 1, namespace.length());
        log.info("sql intercept methodName: {}", methodName);

        /** page 开头的方法需要分页 **/
        if (StringUtils.isNotEmpty(methodName) && methodName.toLowerCase().startsWith("page")) {
            ParameterHandler parameter = (ParameterHandler)metaObject.getValue("delegate.parameterHandler");
            Map<String, Object> parameterObject = (Map<String, Object>) parameter.getParameterObject();
            log.info("parameterObject: {}", JSONObject.toJSONString(parameterObject));

            /**
             * 反序列化到 page 对象
             */
            BasePageReq pageReqParameter = (BasePageReq)parameterObject.get("param");
            log.info("param: {}", JSONObject.toJSONString(parameterObject));

            Integer currentPageNum = pageReqParameter.getCurrentPageNum();
            Integer pageSize = pageReqParameter.getPageSize();

            StringBuffer baseSql = new StringBuffer(boundSql.getSql());
            log.info("base SQL: {}", baseSql);

            baseSql.append(" limit ")
                    .append((currentPageNum - 1) * pageSize + ", ")
                    .append(pageSize);
            log.info("limit SQL: {}", baseSql);
            metaObject.setValue("delegate.boundSql.sql", baseSql.toString());
        }

        /**
         * 获取mapper名称
         */
        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Interceptor.super.plugin(target);
    }

    @Override
    public void setProperties(Properties properties) {
        Interceptor.super.setProperties(properties);
    }
}
