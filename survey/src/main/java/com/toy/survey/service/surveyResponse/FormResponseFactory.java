package com.toy.survey.service.surveyResponse;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.FormResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FormResponseFactory {

  public FormResponse create(Form form, ResponseUserStrategy strategy) {
    FormResponse.FormResponseBuilder builder = FormResponse.builder().form(form).submittedAt(LocalDateTime.now());
    strategy.applyUserInfo(builder);
    return builder.build();
  }
  
}
