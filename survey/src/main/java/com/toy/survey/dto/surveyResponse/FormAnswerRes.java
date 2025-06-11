package com.toy.survey.dto.surveyResponse;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "설문 응답 항목 응답 DTO")
public class FormAnswerRes {

  @Schema(description = "질문 ID", example = "101")
  private Long questionId;

  @Schema(description = "텍스트 응답", example = "매우 만족합니다.")
  private String answerText;

  @Schema(description = "선택된 옵션 ID 목록", example = "[1, 2]")
  private List<Long> selectedOption;
}