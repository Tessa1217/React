package com.toy.survey.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserRes {

  private Long id;

  private String email;

  private String name;
  
}
