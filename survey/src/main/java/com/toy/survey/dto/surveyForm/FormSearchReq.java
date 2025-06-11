package com.toy.survey.dto.surveyForm;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Schema(description = "설문 검색 요청 DTO")
public class FormSearchReq {

  @Schema(description = "검색 키워드", example = "고객만족")
  private String searchKeyword;

  @Schema(description = "검색 필터 (예: 최신순, 인기순)", example = "latest")
  private String searchFilter;
}