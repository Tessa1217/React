package com.toy.survey.dto.user;

import org.hibernate.validator.constraints.Length;

import com.toy.survey.domain.user.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class SignUpUserReq {

  @NotBlank(message = "이메일은 필수값입니다.")
  @Email(message = "올바른 이메일 주소를 입력해주세요.")
  @Length(max = 200)
  private String email;

  @NotBlank(message = "비밀번호는 필수값입니다.")
  @Length(min = 8, max = 20, message = "비밀번호는 8자리 이상 20자리 이하로 입력해주세요.")
  private String password;

  @NotBlank(message = "성명은 필수값입니다.")
  @Length(max = 100)
  private String name;

  public User toEntity() {
    User user = User.builder()
                    .email(email)
                    .password(password)
                    .name(name)
                    .build();
    return user;                    
  }

}
