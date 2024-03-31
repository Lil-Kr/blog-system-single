package com.cy.single.blog.pojo.vo.blog;

import com.cy.single.blog.pojo.entity.blog.BlogLabel;
import lombok.ToString;

import java.io.Serializable;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
@ToString
public class BlogLabelVO extends BlogLabel implements Serializable {

    private static final long serialVersionUID = -4260688027806695727L;

    private String surrogateIdStr;

    public String getSurrogateIdStr() {
        return surrogateIdStr;
    }

    public void setSurrogateIdStr(String surrogateIdStr) {
        this.surrogateIdStr = surrogateIdStr;
    }
}
