package com.toy.survey.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.user.User;

public interface UserRepository extends JpaRepository<User, Long> {

  User findByEmail(String email);
  
}
