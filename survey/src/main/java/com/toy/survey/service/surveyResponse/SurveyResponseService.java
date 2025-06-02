package com.toy.survey.service.surveyResponse;

import org.springframework.data.domain.Pageable;

import com.toy.survey.dto.common.PageRes;
import com.toy.survey.dto.surveyResponse.FormResponseDetailRes;
import com.toy.survey.dto.surveyResponse.FormResponseReq;
import com.toy.survey.dto.surveyResponse.FormResponseRes;
import com.toy.survey.dto.surveyResponse.FormResponseSearchReq;

public interface SurveyResponseService {
  
  PageRes<FormResponseRes> getSurveyResponseList(Pageable pageable, FormResponseSearchReq searchReq);

  FormResponseDetailRes getSurveyResponse(Long id);

  Long insSurveyResponse(FormResponseReq formResponse);

}
