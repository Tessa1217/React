package com.toy.survey.repository.code;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.code.Code;

public interface CodeRepository extends JpaRepository<Code, Long> {
  
  Optional<Code> findByCode(String code);

}
