package com.cy.single.blog.base;

import lombok.ToString;

import java.io.Serializable;

/**
 * @Author: Lil-K
 * @Date: 2024/3/4
 * @Description:
 */
@ToString
public class BaseReq implements Serializable {

    private static final long serialVersionUID = 7567175837804014960L;

    private String createTime;

    private String updateTime;

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }
}
