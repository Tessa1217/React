package com.toy.survey.dto.surveyForm;

import com.toy.survey.domain.survey.OptionItem;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder 
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionItemReq {

  private Long id;
  
  @NotBlank(message = "옵션 내용은 필수값입니다.")
  private String optionText;

  private Integer optionOrder;

  public OptionItem toEntity() {
    return OptionItem.builder()                               
                     .optionText(optionText)
                     .optionOrder(optionOrder)
                     .build();
  }
  
}
