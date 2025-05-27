package com.toy.survey.config;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CustomUserPrincipal {

  private Long id;

  private String userId;
  
}
