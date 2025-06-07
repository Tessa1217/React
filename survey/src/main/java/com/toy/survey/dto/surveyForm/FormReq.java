package com.toy.survey.dto.surveyForm;

import java.time.LocalDate;
import java.util.List;

import com.toy.survey.domain.survey.Form;

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
public class FormReq {

  private Long id;
  
  @NotBlank(message = "설문 제목은 필수값입니다.")
  private String title;

  private String description;

  private Boolean isPublic;

  private Boolean requiresLogin;

  private LocalDate expiresAt;

  @Valid
  @NotNull
  @Size(min = 1, message = "설문 질문을 최소 1개 이상 추가해주세요.")
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
