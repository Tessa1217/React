package com.toy.survey.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum QuestionType {
  
  MULTIPLE_CHOICE("MULTIPLE_CHOICE"),

  SHORT_ANSWER("SHORT_ANSWER"),

  PARAGRAPH("PARAGRAPH"),

  CHECKBOX("CHECKBOX"),

  DROPDOWN("DROPDOWN");

  private final String code;

  QuestionType (String code) {
    this.code = code;
  }

  @JsonValue
  public String getCode() {
    return code;
  }

  @JsonCreator
  public static QuestionType fromCode(String code) {
    for (QuestionType type : QuestionType.values()) {
      if (type.code.equalsIgnoreCase(code)) {
        return type;
      }
    }
    throw new IllegalArgumentException("Invalid QuestionType: " + code);
  }  

}
