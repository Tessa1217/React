package com.toy.survey.dto.surveyResponse;

import java.time.LocalDateTime;
import java.util.List;

import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.dto.surveyForm.FormRes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FormResponseDetailRes {

  private Long id;

  private LocalDateTime submittedAt;

  private FormRes form;

  private List<FormAnswerRes> answers;
  
  public static FormResponseDetailRes fromEntity(FormResponse formResponse) {
    return FormResponseDetailRes.builder()
                          .id(formResponse.getId())
                          .submittedAt(formResponse.getSubmittedAt())
                          .build();
  }  

  public void setForm(FormRes form) {
    this.form = form;    
  }

  public void setAnswers(List<FormAnswerRes> answers) {
    this.answers = answers;
  }
  
}
