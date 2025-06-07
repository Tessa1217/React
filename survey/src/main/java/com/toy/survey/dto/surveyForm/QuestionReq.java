package com.toy.survey.dto.surveyForm;

import java.util.List;

import com.toy.survey.domain.survey.Question;
import com.toy.survey.enums.QuestionType;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

  @NotBlank(message = "질문 제목은 필수값입니다.")
  private String questionText;

  @NotNull(message = "질문 유형은 필수값입니다.")
  private QuestionType type;

  private Boolean isRequired;

  private Integer questionOrder;

  @Valid
  private List<OptionItemReq> options;

  public Question toEntity() {
    Question question =  Question.builder()                                                            
                                 .questionText(questionText)                                 
                                 .isRequired(isRequired)
                                 .questionOrder(questionOrder)
                                 .build();

    return question;

  }

}
