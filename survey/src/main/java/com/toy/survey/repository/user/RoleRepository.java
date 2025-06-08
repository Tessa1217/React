package com.toy.survey.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.user.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {

  Optional<Role> findByName(String name);
  
}
