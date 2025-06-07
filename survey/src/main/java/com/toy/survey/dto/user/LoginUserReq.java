package com.toy.survey.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LoginUserReq {

  @NotBlank(message = "아이디는 필수값입니다.")
  private String userId;

  @NotBlank(message = "비밀번호는 필수값입니다.")  
  private String password;
  
}
