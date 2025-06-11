package com.toy.survey.dto.surveyForm;

import com.toy.survey.domain.survey.OptionItem;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder 
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Schema(description = "옵션 항목 응답 DTO")
public class OptionItemRes {

  @Schema(description = "옵션 ID", example = "10")
  private Long id;

  @Schema(description = "옵션 텍스트", example = "보통")
  private String optionText;

  @Schema(description = "옵션 순서", example = "2")
  private Integer optionOrder;

  @Schema(description = "기타 옵션 여부", example = "false")
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
