package com.toy.survey.repository.survey;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.survey.Form;

public interface FormRepository extends JpaRepository<Form, Long> {

  Page<Form> findAllByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
  
}
