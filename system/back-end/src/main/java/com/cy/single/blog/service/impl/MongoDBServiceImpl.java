package com.cy.single.blog.service.impl;

import com.cy.single.blog.pojo.entity.demo.User;
import com.cy.single.blog.dao.MongoDBRepository;
import com.cy.single.blog.service.MongoDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @Author: Lil-K
 * @Date: 2024/5/26
 * @Description:
 */
@Service
public class MongoDBServiceImpl implements MongoDBService {

  @Autowired
  private MongoDBRepository mongoDBRepository;


  @Override
  public User save(User user) {
    User save = mongoDBRepository.save(user);
    return save;
  }


  @Override
  public User getMongoById(Long surrogateId) {
    Optional<User> byId = mongoDBRepository.findById(String.valueOf(surrogateId));
    if (byId.isPresent()) {
      return byId.get();
    }else {
      return null;
    }
  }
}
