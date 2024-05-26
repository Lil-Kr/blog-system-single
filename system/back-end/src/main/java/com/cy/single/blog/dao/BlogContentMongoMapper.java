package com.cy.single.blog.dao;

import com.cy.single.blog.pojo.entity.blog.BlogContentMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @Author: Lil-K
 * @Date: 2024/5/26
 * @Description:
 */
public interface BlogContentMongoMapper extends MongoRepository<BlogContentMongo, String> {
}
