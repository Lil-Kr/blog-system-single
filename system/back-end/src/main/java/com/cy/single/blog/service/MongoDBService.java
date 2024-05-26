package com.cy.single.blog.service;

import com.cy.single.blog.pojo.entity.demo.User;

/**
 * @Author: Lil-K
 * @Date: 2024/5/26
 * @Description:
 */
public interface MongoDBService {

  User save(User user);

  User getMongoById(Long surrogateId);
}
