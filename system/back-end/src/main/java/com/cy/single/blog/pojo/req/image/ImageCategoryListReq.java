package com.cy.single.blog.pojo.req.image;

import com.cy.single.blog.base.BaseReq;
import lombok.Data;
import lombok.ToString;

/**
 * @Author: Lil-K
 * @Date: 2025/3/30
 * @Description:
 */
@ToString
@Data
public class ImageCategoryListReq extends BaseReq {

	private String name;

	private String remark;
}
