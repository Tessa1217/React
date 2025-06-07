package com.toy.survey.dto.surveyResponse;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FormResponseRes {

  private Long id;

  private String title;

  private String description;

  private Boolean isPublic;

  private Boolean requiresLogin;

  private LocalDate expiresAt;

  private Long responseId;
  
}
