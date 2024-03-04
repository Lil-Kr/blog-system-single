package com.cy.single.blog.utils.secret;

import cn.hutool.crypto.Mode;
import cn.hutool.crypto.Padding;
import cn.hutool.crypto.symmetric.AES;

/**
 * @Author: Lil-K
 * @Date: 2022/12/21
 * @Description:
 */
public class SymmetricEncryptionUtils {

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
    public static final String decryptAES(String code) {
        return aes.decryptStr(code);
    }

    public static void main(String[] args) {
        String a = "Y0A1DnXz/a5jHfsToUYDpTvmfbejnA+m2oB9NYRDTveKcD9aOk9k5Af6iCWp6W4ac+BESZ5WUGDKC7nEIc16NlE+2TSRHXauPnC4n9SE/lSU2yuz0P3POXuMT7NINpzSrToRuGiQWpwbdw+w7iHhzrY7srvmhQTRkfOzZYoF+rZ6A334GW5SflF2LCCjIG6NAzNtU+sdReVrzEf6xM5BPMHpUtuH/X3sKtaAL46c5DWQjKzfBcL0E2sLg3TnhSF/M9z7Dk8X7zK0dNEa2v/c57d1Bp1OfBeAUlFje4JYY2EHFUPWx72Jx20wlGTmKogl2Ue8R+b52uTkDH+dClm4wA==";

        String s = decryptAES(a);
        System.out.println(s);
    }

}
