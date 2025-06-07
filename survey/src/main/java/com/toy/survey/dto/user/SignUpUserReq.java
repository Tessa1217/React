package com.toy.survey.dto.user;

import com.toy.survey.domain.user.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SignUpUserReq {

  @NotBlank(message = "아이디는 필수값입니다.")
  @Size(min = 5, max = 50, message="아이디는 5자리 이상 50자리 이하로 입력해주세요.")
  private String userId;

  @NotBlank(message = "이메일은 필수값입니다.")
  @Email(message = "올바른 이메일 주소를 입력해주세요.")
  @Size(max = 200)
  private String email;

  @NotBlank(message = "비밀번호는 필수값입니다.")
  @Size(min = 8, max = 20, message = "비밀번호는 8자리 이상 20자리 이하로 입력해주세요.")
  private String password;

  @NotBlank(message = "성명은 필수값입니다.")
  @Size(max = 100, message = "성명은 100자리 이하로 입력해주세요.")
  private String name;

  public User toEntity() {
    User user = User.builder()
                    .userId(userId)
                    .email(email)                    
                    .password(password)
                    .name(name)
                    .build();
    return user;                    
  }

}
