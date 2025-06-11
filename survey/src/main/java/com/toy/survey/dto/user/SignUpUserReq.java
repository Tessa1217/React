package com.toy.survey.dto.user;

import com.toy.survey.domain.user.User;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "회원가입 요청 DTO")
public class SignUpUserReq {

  @Schema(description = "사용자 ID", example = "user123", required = true)
  @NotBlank(message = "아이디는 필수값입니다.")
  @Size(min = 5, max = 50, message="아이디는 5자리 이상 50자리 이하로 입력해주세요.")
  private String userId;

  @Schema(description = "이메일 주소", example = "user@example.com", required = true)
  @NotBlank(message = "이메일은 필수값입니다.")
  @Email(message = "올바른 이메일 주소를 입력해주세요.")
  @Size(max = 200)
  private String email;

  @Schema(description = "비밀번호 (8~20자)", example = "P@ssw0rd!", required = true)
  @NotBlank(message = "비밀번호는 필수값입니다.")
  @Size(min = 8, max = 20, message = "비밀번호는 8자리 이상 20자리 이하로 입력해주세요.")
  private String password;

  @Schema(description = "사용자 이름", example = "홍길동", required = true)
  @NotBlank(message = "성명은 필수값입니다.")
  @Size(max = 100, message = "성명은 100자리 이하로 입력해주세요.")
  private String name;

  public User toEntity() {
    return User.builder()
               .userId(userId)
               .email(email)
               .password(password)
               .name(name)
               .build();
  }
}

