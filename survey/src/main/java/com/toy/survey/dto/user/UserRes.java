package com.toy.survey.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "사용자 응답 DTO")
public class UserRes {

  @Schema(description = "사용자 고유 ID", example = "1")
  private Long id;

  @Schema(description = "사용자 ID", example = "user123")
  private String userId;

  @Schema(description = "이메일 주소", example = "user@example.com")
  private String email;

  @Schema(description = "사용자 이름", example = "홍길동")
  private String name;
}
