package com.toy.survey.service;

import com.toy.survey.dto.surveyForm.FormRequest;

public interface SurveyFormService {

  void saveSurvey(FormRequest formRequest);
  
}
