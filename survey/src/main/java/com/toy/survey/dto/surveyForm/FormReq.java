package com.toy.survey.dto.surveyForm;

import java.time.LocalDate;
import java.util.List;

import com.toy.survey.domain.survey.Form;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "설문 등록/수정 요청 DTO")
public class FormReq {

  @Schema(description = "설문지 ID (수정 시에만 사용)", example = "101")
  private Long id;

  @NotBlank(message = "설문 제목은 필수값입니다.")
  @Schema(description = "설문 제목", example = "2025년 상반기 만족도 조사", required = true)
  private String title;

  @Schema(description = "설문 설명", example = "직원들의 만족도를 조사하는 설문입니다.")
  private String description;

  @Schema(description = "공개 여부", example = "true")
  private Boolean isPublic;

  @Schema(description = "로그인 필요 여부", example = "false")
  private Boolean requiresLogin;

  @Schema(description = "설문 만료일", example = "2025-07-01")
  private LocalDate expiresAt;

  @Valid
  @NotNull
  @Size(min = 1, message = "설문 질문을 최소 1개 이상 추가해주세요.")
  @Schema(description = "질문 목록", required = true)
  private List<QuestionReq> questionList;

  @Schema(description = "삭제할 질문 ID 목록 (수정 시 사용)", example = "[3, 7]")
  private List<Long> delQuestions;

  public Form toEntity() {

    Form form = Form.builder()
                    .id(id)
                    .title(title)
                    .description(description)
                    .isPublic(isPublic)
                    .requiresLogin(requiresLogin)
                    .expiresAt(expiresAt)
                    .build();          
    return form;
  }
}