package com.toy.survey.dto.surveyForm;

import java.util.List;

import com.toy.survey.domain.survey.Question;
import com.toy.survey.enums.QuestionType;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "질문 요청 DTO")
public class QuestionReq {

  @Schema(description = "질문 ID (수정 시 사용)", example = "3")
  private Long id;

  @NotBlank(message = "질문 제목은 필수값입니다.")
  @Schema(description = "질문 텍스트", example = "서비스에 얼마나 만족하셨나요?")
  private String questionText;

  @NotNull(message = "질문 유형은 필수값입니다.")
  @Schema(description = "질문 유형", example = "MULTIPLE_CHOICE")
  private QuestionType type;

  @Schema(description = "필수 여부", example = "true")
  private Boolean isRequired;

  @Schema(description = "질문 순서", example = "1")
  private Integer questionOrder;

  @Valid
  @Schema(description = "질문 옵션 목록")
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
