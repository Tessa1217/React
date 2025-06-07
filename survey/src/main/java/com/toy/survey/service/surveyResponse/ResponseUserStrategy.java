package com.toy.survey.service.surveyResponse;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.dto.surveyResponse.FormResponseRes;
import com.toy.survey.dto.surveyResponse.FormResponseSearchReq;

public interface ResponseUserStrategy {

  Page<FormResponseRes> findAllWithResponded(Pageable pageable, FormResponseSearchReq searchReq);

  FormResponse findByIdWithAnswers(Long id);

  Optional<FormResponse> findExistingResponse(Long formId);

  void applyUserInfo(FormResponse.FormResponseBuilder builder);

  boolean isAuthenticated();

  Long getUserId();

  String getAnonymousId();
  
}
