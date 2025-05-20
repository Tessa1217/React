package com.toy.survey.repository.survey;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.survey.Form;

public interface SurveyFormRepository extends JpaRepository<Form, Long> {
  
}
