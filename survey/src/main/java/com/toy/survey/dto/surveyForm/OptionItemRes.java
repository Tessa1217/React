package com.toy.survey.dto.surveyForm;

import com.toy.survey.domain.survey.OptionItem;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder 
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OptionItemRes {

  private Long id;
  
  private String optionText;

  private Integer optionOrder;

  private Boolean isEtc;

  public static OptionItemRes fromEntity(OptionItem optionItem) {
    return OptionItemRes.builder()                     
                     .id(optionItem.getId())
                     .optionText(optionItem.getOptionText())
                     .optionOrder(optionItem.getOptionOrder())
                     .isEtc(optionItem.getIsEtc())
                     .build();
  }
  
  
}
