package com.toy.survey.dto.surveyResponse;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "참여한 설문 응답 요약 DTO")
public class FormResponseRes {

  @Schema(description = "설문 ID", example = "55")
  private Long id;

  @Schema(description = "제목", example = "2025년 상반기 만족도 조사")
  private String title;

  @Schema(description = "설명", example = "회사의 전반적인 만족도 조사를 위한 설문입니다.")
  private String description;

  @Schema(description = "공개 여부", example = "true")
  private Boolean isPublic;

  @Schema(description = "로그인 필요 여부", example = "false")
  private Boolean requiresLogin;

  @Schema(description = "설문 만료일", example = "2025-06-30")
  private LocalDate expiresAt;

  @Schema(description = "응답 ID", example = "1001")
  private Long responseId;
}