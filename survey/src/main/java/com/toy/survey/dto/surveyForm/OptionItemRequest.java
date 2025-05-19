package com.toy.survey.dto.surveyForm;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder 
public class OptionItemRequest {

  private Long id;
  
  private String optionText;

  private Integer optionOrder;
  
}
