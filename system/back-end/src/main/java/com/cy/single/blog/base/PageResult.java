package com.cy.single.blog.base;

import java.util.List;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description: page list
 */
public class PageResult<T> {

    private List<T> list;

    /**
     * 总记录数
     */
    private Integer total;

    public PageResult(List<T> list, Integer total) {
        this.list = list;
        this.total = total;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }
}
