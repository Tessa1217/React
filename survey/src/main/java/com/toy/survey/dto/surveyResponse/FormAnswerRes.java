package com.toy.survey.dto.surveyResponse;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FormAnswerRes {

  private Long questionId;

  private String answerText;

  private List<Long> selectedOption;
  
}
