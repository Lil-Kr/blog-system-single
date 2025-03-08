package com.cy.single.blog.utils.secret;

import cn.hutool.crypto.Mode;
import cn.hutool.crypto.Padding;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.crypto.symmetric.AES;

/**
 * @Author: Lil-K
 * @Date: 2022/12/21
 * @Description:
 */
public class EncryptUtils {

    private static final String SECURE_KEY = "f6292dad-0aad-4c";
    // key
    private static final byte[] key = SECURE_KEY.getBytes();
    // 偏移量
    private static final byte[] iv = SECURE_KEY.getBytes();
    //
    private static final AES aes = new AES(Mode.CBC, Padding.PKCS5Padding, key, iv);

    /**
     * AES模式 加密
     * @param code
     * @return
     */
    public static final String encryptAES(String code) {
        return aes.encryptBase64(code);
    }

    /**
     * AES模式 解密
     * @param code
     * @return
     */
    public static String decryptAES(String code) {
        return aes.decryptStr(code);
    }

    /**
     * md5 encrypt
     * @param encrypt
     * @return
     */
    public static String md5(String encrypt) {
        return SecureUtil.md5(encrypt);
    }

}
