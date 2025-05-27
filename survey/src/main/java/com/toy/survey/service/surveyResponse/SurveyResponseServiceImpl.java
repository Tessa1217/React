package com.toy.survey.service.surveyResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.toy.survey.dto.surveyResponse.ResponseFormRes;
import com.toy.survey.repository.surveyResponse.SurveyResponseQueryDSLRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyResponseServiceImpl implements SurveyResponseService {

  private final SurveyResponseQueryDSLRepository surveyResponseQueryDSLRepository;

  @Override
  public Page<ResponseFormRes> getSurveyResponseList(Pageable pageable) {
    
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getSurveyResponseList'");
  }
  
}
