package com.toy.survey.repository.survey;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.survey.FormResponse;

public interface FormResponseRepository extends JpaRepository<FormResponse, Long> {
  
}
