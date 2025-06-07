package com.toy.survey.service.surveyResponse;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.domain.survey.FormResponse.FormResponseBuilder;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.surveyResponse.FormResponseRes;
import com.toy.survey.dto.surveyResponse.FormResponseSearchReq;
import com.toy.survey.exception.NotFoundException;
import com.toy.survey.repository.survey.FormResponseRepository;
import com.toy.survey.repository.surveyResponse.SurveyResponseQueryDSLRepository;
import com.toy.survey.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AuthenticatedUserStrategy implements ResponseUserStrategy {

  private final Long userId;

  private final UserRepository userRepository;

  private final FormResponseRepository formResponseRepository;

  private final SurveyResponseQueryDSLRepository surveyResponseQueryDSLRepository;

  @Override
  public Page<FormResponseRes> findAllWithResponded(Pageable pageable, FormResponseSearchReq searchReq) {
    return surveyResponseQueryDSLRepository.findAllWithRespondedByUser(pageable, userId, searchReq);
  }

  @Override
  public FormResponse findByIdWithAnswers(Long id) {
    return surveyResponseQueryDSLRepository.findByIdWithAnswersByUser(id, userId);
  }  
  
  @Override
  public Optional<FormResponse> findExistingResponse(Long formId) {
    return formResponseRepository.findByFormIdAndUserId(formId, userId);
  }

  @Override
  public void applyUserInfo(FormResponseBuilder builder) {
    User user = userRepository.findById(userId)
                              .orElseThrow(() -> new NotFoundException("해당 유저가 존재하지 않습니다."));
    builder.user(user);
  }

  @Override
  public boolean isAuthenticated() {
    return true;
  }

  @Override
  public Long getUserId() {
    return userId;
  }

  @Override
  public String getAnonymousId() {
    return null;
  }
  
  
}
