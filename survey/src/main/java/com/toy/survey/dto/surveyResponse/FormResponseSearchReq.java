package com.toy.survey.dto.surveyResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Schema(description = "참여 설문 검색 요청 DTO")
public class FormResponseSearchReq {

  @Schema(description = "검색 키워드 (제목 기준)", example = "만족도")
  private String searchKeyword;

  @Schema(description = "응답 여부", example = "true")
  private Boolean hasResponded;
  
}