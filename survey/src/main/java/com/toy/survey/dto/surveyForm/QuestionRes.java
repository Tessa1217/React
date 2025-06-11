package com.toy.survey.dto.surveyForm;

import java.util.List;

import com.toy.survey.domain.survey.Question;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "질문 응답 DTO")
public class QuestionRes {

  @Schema(description = "질문 ID", example = "3")
  private Long id;

  @Schema(description = "질문 텍스트", example = "서비스에 얼마나 만족하셨나요?")
  private String questionText;

  @Schema(description = "질문 유형 코드", example = "MULTIPLE_CHOICE")
  private String type;

  @Schema(description = "필수 여부", example = "true")
  private Boolean isRequired;

  @Schema(description = "질문 순서", example = "1")
  private Integer questionOrder;

  @Schema(description = "질문 옵션 목록")
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
