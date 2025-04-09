package com.cy.single.blog.pojo.req.org;

import com.cy.single.blog.base.BasePageReq;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class OrgListAllReq extends BasePageReq {

  private Long surrogateId;

  // org number
  private String number;

  // org name
  private String name;

  private Integer seq;

  private String remark;
}
