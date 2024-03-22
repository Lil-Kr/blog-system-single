package com.cy.single.blog.utils.checkUtil;

import java.util.regex.Pattern;

public class CheckUtil {

    /**邮箱正则匹配表达式**/
    public static final String EMAIL_REGEXP = "^(\\w+([-.][A-Za-z0-9]+)*){3,18}@\\w+([-.][A-Za-z0-9]+)*\\.\\w+([-.][A-Za-z0-9]+)*$";

    /**
     * 注册账号字符规则
     **/
    public static final String ACCOUNT_REGEXP = "^[a-zA-Z0-9_][a-zA-Z0-9]*$";


    /**
     * 邮箱格式校验
     * @param email
     * @return
     */
    public static boolean checkEmail(String email) {
        return Pattern.matches(EMAIL_REGEXP, email);
    }

    public static boolean checkAccount(String account) {
        return Pattern.matches(ACCOUNT_REGEXP, account);
    }

}
