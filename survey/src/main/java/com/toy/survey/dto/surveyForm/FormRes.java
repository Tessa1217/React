package com.toy.survey.dto.surveyForm;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.user.User;

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

  private LocalDateTime expiresAt;

  private Long userId;

  private List<QuestionRes> questions;

  public static FormRes fromEntity(Form form) {
    
    return FormRes.builder()
                  .id(form.getId())
                  .title(form.getTitle())
                  .description(form.getDescription())
                  .isPublic(form.getIsPublic())
                  .requiresLogin(form.getRequiresLogin())
                  .expiresAt(form.getExpiresAt())
                  // .userId(Optional.ofNullable(form.getUser()).map(User::getId));
                  .build();                                           
  }
  
}
