package com.toy.survey.dto.surveyForm;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FormRequest {
  
  private String title;

  private String description;

  private Boolean isPublic;

  private Boolean requiresLogin;

  private LocalDateTime expiresAt;

  private List<QuestionRequest> questionList;
}
