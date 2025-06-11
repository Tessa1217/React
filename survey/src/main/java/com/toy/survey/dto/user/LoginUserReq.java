package com.toy.survey.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "로그인 DTO")
public class LoginUserReq {

  @NotBlank(message = "아이디는 필수값입니다.")
  @Schema(description = "사용자 아이디")
  private String userId;

  @NotBlank(message = "비밀번호는 필수값입니다.")  
  @Schema(description = "사용자 비밀번호")
  private String password;
  
}
