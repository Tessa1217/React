package com.toy.survey.dto.surveyForm;

import java.time.LocalDateTime;
import java.util.List;

import com.toy.survey.domain.survey.Form;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FormReq {

  private Long id;
  
  private String title;

  private String description;

  private Boolean isPublic;

  private Boolean requiresLogin;

  private LocalDateTime expiresAt;

  private List<QuestionReq> questionList;

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
