package com.cy.single.blog.base;

import java.io.Serializable;
import java.util.Date;

/**
 * @Author: Lil-K
 * @Date: 2024/3/31
 * @Description:
 */
public class BaseDO implements Serializable {

    private static final long serialVersionUID = -4120652138040137224L;

    private Integer deleted;
    
    /**
     * 创建人
     */
    private Long creatorId;

    /**
     * 修改人
     */
    private Long modifierId;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更改时间
     */
    private Date updateTime;

    public Integer getDeleted() {
        return deleted;
    }

    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Long getModifierId() {
        return modifierId;
    }

    public void setModifierId(Long modifierId) {
        this.modifierId = modifierId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
