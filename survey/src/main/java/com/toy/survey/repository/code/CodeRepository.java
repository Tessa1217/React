package com.toy.survey.repository.code;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.code.Code;

public interface CodeRepository extends JpaRepository<Code, Long> {
  
  Code findByCode(String code);

}
