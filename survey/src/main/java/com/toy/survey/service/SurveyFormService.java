package com.toy.survey.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.dto.surveyForm.FormRes;

public interface SurveyFormService {

  Page<FormRes> getSurveyFormList(Pageable pageable);

  FormRes getSurveyForm(Long id);

  void saveSurvey(FormReq formRequest);

  void updateSurvey(FormReq formRequest);
  
}
