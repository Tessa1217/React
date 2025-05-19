package com.toy.survey.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum QuestionType {
  
  SHORT_ANSWER("short_answer"),

  PARAGRAPH("paragraph"),

  MULTIPLE_CHOICE("multiple_choice"),

  CHECKBOX("checkbox"),

  DROPDOWN("dropdown");

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

  // public static QuestionType fromCode(String code) {
  //   for (QuestionType type : QuestionType.values()) {
  //     if (type.code.equalsIgnoreCase(code)) {
  //       return type;
  //     }
  //   }
  //   throw new IllegalArgumentException("Invalid QuestionType: " + code);
  // }

}
