package com.cy.single.blog.pojo.req.sys.user;

import com.cy.single.blog.utils.checkUtil.CheckUtil;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

/**
 * @Author: Lil-K
 * @Date: 2024/3/17
 * @Description:
 */
@ToString
@Data
public class UserRegisterReq {

  /**
   * 登录账号
   */
  @NotBlank(message = "账号不能为空")
  @Length(min = 5, max = 20, message = "账号长度范围在 5~20 个字符之间")
  @Pattern(regexp = CheckUtil.ACCOUNT_REGEXP, message = "账号必须以下划线字母数字开头")
  private String account;

  /**
   * 用户名
   */
  @NotBlank(message = "昵称不能为空")
  @Length(min = 5, max = 20, message = "昵称长度过长, 必须在20个字符以内")
  private String userName;

  /**
   * 邮箱
   */
  @NotBlank(message = "邮箱不能为空")
  @Pattern(regexp = CheckUtil.EMAIL_REGEXP, message = "邮件不合法")
  private String email;

}
