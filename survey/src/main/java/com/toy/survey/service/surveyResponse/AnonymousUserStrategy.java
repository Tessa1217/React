package com.toy.survey.service.surveyResponse;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.domain.survey.FormResponse.FormResponseBuilder;
import com.toy.survey.dto.surveyResponse.FormResponseRes;
import com.toy.survey.dto.surveyResponse.FormResponseSearchReq;
import com.toy.survey.repository.survey.FormResponseRepository;
import com.toy.survey.repository.surveyResponse.SurveyResponseQueryDSLRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AnonymousUserStrategy implements ResponseUserStrategy {

  private final String anonymousId;

  private final FormResponseRepository formResponseRepository;

  private final SurveyResponseQueryDSLRepository surveyResponseQueryDSLRepository;

  @Override
  public Page<FormResponseRes> findAllWithResponded(Pageable pageable, FormResponseSearchReq searchReq) {
    return surveyResponseQueryDSLRepository.findAllWithRespondedByAnonymousUser(pageable, anonymousId, searchReq);
  }

  @Override
  public FormResponse findByIdWithAnswers(Long id) {
    return surveyResponseQueryDSLRepository.findByIdWithAnswersByAnonymousUser(id, anonymousId);
  }  
  
  @Override
  public Optional<FormResponse> findExistingResponse(Long formId) {
    return formResponseRepository.findByFormIdAndAnonymousId(formId, anonymousId);
  }

  @Override
  public void applyUserInfo(FormResponseBuilder builder) {
    builder.anonymousId(anonymousId);
  }

  @Override
  public boolean isAuthenticated() {
    return true;
  }

  @Override
  public Long getUserId() {
    return null;
  }

  @Override
  public String getAnonymousId() {
    return anonymousId;
  }


  
}
