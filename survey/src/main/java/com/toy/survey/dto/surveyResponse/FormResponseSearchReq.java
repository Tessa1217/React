package com.toy.survey.dto.surveyResponse;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class FormResponseSearchReq {
  
  private String searchKeyword;

  private Boolean hasResponded;

}
