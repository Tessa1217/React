package com.toy.survey.dto.surveyForm;

import java.time.LocalDate;
import java.util.List;

import com.toy.survey.domain.survey.Form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FormRes {

  private Long id;

  private String title;

  private String description;

  private Boolean isPublic;

  private Boolean requiresLogin;

  private LocalDate expiresAt;

  private Boolean hasResponse;

  private Long userId;

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
