package com.toy.survey.service.surveyResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.toy.survey.dto.surveyResponse.FormResponseDetailRes;
import com.toy.survey.dto.surveyResponse.FormResponseReq;
import com.toy.survey.dto.surveyResponse.FormResponseRes;

public interface SurveyResponseService {
  
  Page<FormResponseRes> getSurveyResponseList(Pageable pageable);

  FormResponseDetailRes getSurveyResponse(Long id);

  Long insSurveyResponse(FormResponseReq formResponse);

}
