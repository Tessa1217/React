package com.toy.survey.dto.surveyForm;

import java.util.List;
import java.util.stream.Collectors;

import com.toy.survey.domain.code.Code;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.enums.QuestionType;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder 
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionReq {
  
  private Long id;

  private String questionText;

  private QuestionType type;

  private Boolean isRequired;

  private Integer questionOrder;

  private List<OptionItemReq> options;

  public Question toEntity() {
    Question question =  Question.builder()           
                                 .id(id)                      
                                 .questionText(questionText)                                 
                                 .isRequired(isRequired)
                                 .questionOrder(questionOrder)
                                 .build();

    return question;

  }

}
