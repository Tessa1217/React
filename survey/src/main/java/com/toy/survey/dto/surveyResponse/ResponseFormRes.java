package com.toy.survey.dto.surveyResponse;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ResponseFormRes {

  private Long id;

  private String title;

  private String description;

  private Boolean isPublic;

  private Boolean requiresLogin;

  private LocalDateTime expiresAt;

  private Boolean responsed;
  
}
