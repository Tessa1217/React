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

  private QuestionType type;

  private Boolean isRequired;

  private Integer questionOrder;

  private List<OptionItemRes> options;

  public static QuestionRes fromEntity(Question question) {

    List<OptionItemRes> optionItemRes = question.getOptionList()
                                                .stream()
                                                .map(option -> OptionItemRes.fromEntity(option))
                                                .collect(Collectors.toList());
                                               
    QuestionRes questionRes = QuestionRes.builder()
                                      .id(question.getId())
                                      .isRequired(question.getIsRequired())
                                      .questionOrder(question.getQuestionOrder())
                                      .options(optionItemRes)
                                      .build();


    return questionRes;

  }  
  
}
