package com.cy.single.blog.pojo.entity.demo;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @Author: Lil-K
 * @Date: 2024/5/26
 * @Description:
 */
@Data
@ToString
@Document(collection = "content") // 表名
public class User {

  @Id
  private String id;
  private String name;
  private String email;
}
