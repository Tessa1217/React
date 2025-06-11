package com.toy.survey.dto.surveyForm;

import com.toy.survey.domain.survey.OptionItem;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "옵션 항목 요청 DTO")
public class OptionItemReq {

  @Schema(description = "옵션 ID (수정 시 사용)", example = "10")
  private Long id;

  @NotBlank(message = "옵션 내용은 필수값입니다.")
  @Schema(description = "옵션 텍스트", example = "매우 만족")
  private String optionText;

  @Schema(description = "옵션 순서", example = "1")
  private Integer optionOrder;

  @Schema(description = "기타 옵션 여부", example = "false")
  private Boolean isEtc;

  public OptionItem toEntity() {
    return OptionItem.builder()                               
                     .optionText(optionText)
                     .optionOrder(optionOrder)
                     .isEtc(isEtc)
                     .build();
  }
  
}
