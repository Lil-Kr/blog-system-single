package com.cy.single.blog.utils.jwtUtil;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.cy.single.blog.aspect.exceptions.BusinessException;
import com.cy.single.blog.base.ApiResp;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import java.util.*;
import static com.cy.single.blog.enums.ReturnCodeEnum.*;

/**
 * @Author: Lil-K
 * @Date: 2022/12/15
 * @Description:
 */
@Slf4j
public class JwtTokenUtil {

    /**
     * Issuer
     */
    private static final String ISSUER = "blog-system";

    /**
     * Audience: 接收方的一种标识
     */
    private static final String AUDIENCE = "all-front";

    /**
     * 签名密钥 secret_key
     */
    private static final String SECRET_KEY = "35b83335-e932-483c-9640-981f8b4cf0bc";

    /**
     * 算法
     */
    private static final Algorithm ALGORITHM = Algorithm.HMAC256(SECRET_KEY);

    /**
     * Header
     */
    private static final Map<String, Object> HEADER_MAP = new HashMap<String, Object>() {
        {
            put("alg", "HS256");
            put("typ", "JWT");
        }
    };

    /**
     * 时间对象
     */
    private static Calendar calendar = new GregorianCalendar();

    /**
     * 默认时间
     * 120 分钟过期
     */
    private static final int DEFAULT_EXPIRE_DATE = 2 * 60;
    private static final int DEFAULT_EXPIRE_OFFSET = 2;

    /**
     * 默认 token generator
     * @param payload
     * @return
     */
    public static String generatorJwtToken (Map<String,Object> payload) {
        return generatorJwtToken(DateTime.now(), DEFAULT_EXPIRE_DATE, payload);
    }

    /**
     * 自定义过期时间
     * @param expireTime
     * @param payload
     * @return
     */
    public static String generatorJwtToken (int expireTime, Map<String,Object> payload) {
        return generatorJwtToken(DateTime.now(), expireTime, payload);
    }

    /**
     * generatorJwtToken
     * @return
     */
    public static String generatorJwtToken(DateTime nowDateTime, int expireTime, Map<String,Object> payload) {
        JWTCreator.Builder tokenBuilder = JWT.create();
        /**
         * token
         * 格式: head.payload.singurater
         * iss: jwt签发者;
         * sub: jwt所面向的用户;
         * aud: 接收jwt的一方;
         * exp: jwt的过期时间, 这个过期时间必须要大于签发时间;
         * nbf: 定义在什么时间之前, 该jwt都是不可用的;
         * iat: jwt的签发时间;
         * jti: jwt的唯一身份标识，主要用来作为一次性token, 从而回避重放攻击;
         */
        String token = tokenBuilder
                //Header 部分
                .withHeader(HEADER_MAP)
                // payload, 一般存储前端带过来的用户信息
                .withClaim("payload", payload)
                //issuer jwt 签发主体
                .withIssuer(ISSUER)
                //audience
                .withAudience(AUDIENCE)
                .withIssuedAt(nowDateTime.toDate())
                //eat 过期时间
                .withExpiresAt(nowDateTime.plusMinutes(expireTime).toDate())
                //签名, 算法加密
                .sign(ALGORITHM);
        return token;
    }

    /**
     * 校验token
     * @param token
     * @return
     */
    public static ApiResp<Integer> validateToken(String token) {
        if (StringUtils.isBlank(token)) {
            return ApiResp.failure("token can not be empty or null");
        }

        try {
            JWT.require(ALGORITHM).build().verify(token);
            return ApiResp.success("token is validate success");
        } catch (TokenExpiredException e){
            log.warn("token was expired");
            throw new BusinessException("token was expired", BUSINESS_ERROR);
        } catch (Exception e){
            log.warn("token validate was failure");
            throw new BusinessException("token validate was failure", BUSINESS_ERROR);
        }
    }

    /**
     * check token is or not expiration
     * @param token
     * @return true: is expiration, false not expiration
     */
    public static boolean isExpiration (String token) {
        ApiResp<Integer> resp = validateToken(token);
        if (SYSTEM_ERROR.getCode() == resp.getCode()) {// token过期
            return true;
        }else {
            return false;
        }
    }

    /**
     * 续签token, 当token 将要过期时(还没过期)
     * @return
     */
    public static ApiResp<String> renewToken(String token) {
        ApiResp<Integer> resp = validateToken(token);
        if (resp.getCode() != BUSINESS_ERROR.getCode()) {// token error
            return ApiResp.failure("token validate was failure");
        }

        /**
         * 判断token是否即将要过期
         * jwt中的过期时间 - 当前时间 = 偏移量
         */
        // 获取过期时间
        DecodedJWT decode = JWT.decode(token);
        long expiresTime = decode.getExpiresAt().getTime();
        long nowTime = new Date().getTime();
        long diffMinutes = (expiresTime - nowTime) / (60 * 1000) % 60;
        /**
         * 当还剩2分钟过期, 续签
         * todo: 待完善
         */
        if (diffMinutes <= DEFAULT_EXPIRE_OFFSET) {
            String payloadJson = new String(Base64.getDecoder().decode(decode.getPayload()));
            JSONObject jsonObject = JSON.parseObject(payloadJson);
            Map<String,Object> payloadMap = (HashMap)jsonObject.get("payload");
            String newToken = generatorJwtToken(payloadMap);
            return ApiResp.success(SUCCESS.getMessage(), newToken);
        }
        return null;
    }
}
