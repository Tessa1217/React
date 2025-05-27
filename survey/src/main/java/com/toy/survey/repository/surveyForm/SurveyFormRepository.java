package com.toy.survey.repository.surveyForm;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.survey.Form;

public interface SurveyFormRepository extends JpaRepository<Form, Long> {

  Page<Form> findAllByOrderByCreatedAtDesc(Pageable pageable);
  
}
