package com.toy.survey.dto.surveyResponse;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "설문 응답 저장 요청 DTO")
public class FormResponseReq {

  @Schema(description = "설문지 ID", example = "55")
  private Long formId;

  @Schema(description = "응답 항목 리스트")
  private List<FormAnswerReq> formAnswers;
}