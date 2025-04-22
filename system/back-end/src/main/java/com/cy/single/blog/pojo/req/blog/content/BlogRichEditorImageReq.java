package com.cy.single.blog.pojo.req.blog.content;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Author: Lil-K
 * @Date: 2025/4/22
 * @Description:
 */
@Data
@ToString
public class BlogRichEditorImageReq {

  private MultipartFile image;

  private Long blogId;
}