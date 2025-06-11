package com.toy.survey.dto.surveyResponse;

import java.time.LocalDateTime;
import java.util.List;

import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.dto.surveyForm.FormRes;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "설문 응답 상세 응답 DTO")
public class FormResponseDetailRes {

  @Schema(description = "응답 ID", example = "1001")
  private Long id;

  @Schema(description = "응답 제출 시간", example = "2025-06-11T23:00:00")
  private LocalDateTime submittedAt;

  @Schema(description = "설문 폼 정보")
  private FormRes form;

  @Schema(description = "응답 항목 목록")
  private List<FormAnswerRes> answers;
  
  public static FormResponseDetailRes fromEntity(FormResponse formResponse) {
    return FormResponseDetailRes.builder()
                          .id(formResponse.getId())
                          .submittedAt(formResponse.getSubmittedAt())
                          .build();
  }  

  public void setForm(FormRes form) {
    this.form = form;    
  }

  public void setAnswers(List<FormAnswerRes> answers) {
    this.answers = answers;
  }
  
}
