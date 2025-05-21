package com.toy.survey.dto.surveyForm;

import java.util.List;
import java.util.stream.Collectors;

import com.toy.survey.domain.survey.Question;
import com.toy.survey.enums.QuestionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class QuestionRes {

  private Long id;

  private String questionText;

  private String type;

  private Boolean isRequired;

  private Integer questionOrder;

  private List<OptionItemRes> options;

  public static QuestionRes fromEntity(Question question) {                                               
    QuestionRes questionRes = QuestionRes.builder()
                                      .id(question.getId())
                                      .isRequired(question.getIsRequired())
                                      .questionOrder(question.getQuestionOrder())          
                                      .type(question.getQuestionType().getCode())                            
                                      .questionText(question.getQuestionText())
                                      .build();
    return questionRes;

  }  

  public void addOptions(List<OptionItemRes> options) {
    this.options = options;
  }
  
}
