package com.toy.survey.repository.survey;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.survey.FormAnswer;

public interface FormAnswerRepository extends JpaRepository<FormAnswer, Long> {
  
}
