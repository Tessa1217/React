package com.toy.survey.dto.surveyResponse;

import java.util.List;

import com.toy.survey.enums.QuestionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FormAnswerReq {

  private Long questionId;

  private String answerText;

  private QuestionType type;

  private List<Long> selectedOption;
  
}
