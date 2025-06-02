package com.toy.survey.service.surveyForm;

import org.springframework.data.domain.Pageable;

import com.toy.survey.dto.common.PageRes;
import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.dto.surveyForm.FormRes;
import com.toy.survey.dto.surveyForm.FormSearchReq;

public interface SurveyFormService {

  PageRes<FormRes> getSurveyFormList(Pageable pageable, FormSearchReq searchReq);

  FormRes getSurveyForm(Long id);

  void saveSurvey(FormReq formRequest);

  void updateSurvey(FormReq formRequest);
  
}
