package com.toy.survey.service.surveyResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.toy.survey.config.CustomUserPrincipal;
import com.toy.survey.dto.surveyResponse.ResponseFormRes;

public interface SurveyResponseService {
  
  Page<ResponseFormRes> getSurveyResponseList(Pageable pageable, CustomUserPrincipal principal);

}
