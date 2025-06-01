package com.toy.survey.repository.survey;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.survey.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
  
}
