package com.toy.survey.dto.surveyForm;

import java.util.List;

import com.toy.survey.enums.QuestionType;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder 
public class QuestionRequest {
  
  private Long id;

  private String questionText;

  private QuestionType type;

  private Boolean isRequired;

  private Integer questionOrder;

  private List<OptionItemRequest> options;

}
