package com.cy.single.blog.pojo.entity.blog;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @Author: Lil-K
 * @Date: 2024/5/26
 * @Description:
 */
@ToString
@Data
@Builder
@Document(collection = "content") // 表名
public class BlogContentMongo {

  @Id
  private String id;
  private String contentText;
}
