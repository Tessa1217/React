package com.toy.survey.dto.surveyForm;

import java.time.LocalDate;
import java.util.List;

import com.toy.survey.domain.survey.Form;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "설문지 응답 DTO")
public class FormRes {

  @Schema(description = "설문 ID", example = "1")
  private Long id;

  @Schema(description = "설문 제목", example = "2025 고객 만족도 조사")
  private String title;

  @Schema(description = "설문 설명", example = "설문에 참여해주셔서 감사합니다.")
  private String description;

  @Schema(description = "공개 여부", example = "true")
  private Boolean isPublic;

  @Schema(description = "로그인 필요 여부", example = "false")
  private Boolean requiresLogin;

  @Schema(description = "설문 만료일", example = "2025-12-31")
  private LocalDate expiresAt;

  @Schema(description = "해당 사용자의 응답 여부", example = "true")
  private Boolean hasResponse;

  @Schema(description = "작성자 유저 ID", example = "1001")
  private Long userId;

  @Schema(description = "질문 목록")
  private List<QuestionRes> questions;

  public FormRes (Long id, String title, String description,
                  Boolean isPublic, Boolean requiresLogin,
                  LocalDate expiresAt, Boolean hasResponse) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isPublic = isPublic;
    this.requiresLogin = requiresLogin;
    this.expiresAt = expiresAt;
    this.hasResponse = hasResponse;                    
  }

  public static FormRes fromEntity(Form form) {
    
    return FormRes.builder()
                  .id(form.getId())
                  .title(form.getTitle())
                  .description(form.getDescription())
                  .isPublic(form.getIsPublic())
                  .requiresLogin(form.getRequiresLogin())
                  .expiresAt(form.getExpiresAt())                  
                  .userId(form.getUser() != null ? form.getUser().getId() : null)                  
                  .build();                                           
  }

  public void addQuestionRes(List<QuestionRes> questions) {
    this.questions = questions;
  }
  
}
