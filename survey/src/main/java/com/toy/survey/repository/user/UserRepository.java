package com.toy.survey.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.user.User;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByUserId(String userId);

  Optional<User> findByEmail(String email);
  
}
