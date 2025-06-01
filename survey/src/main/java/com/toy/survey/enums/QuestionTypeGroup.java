package com.toy.survey.enums;

import java.util.List;

import lombok.Getter;

@Getter
public enum QuestionTypeGroup {

  SELECT_OPTION_GROUP(List.of(QuestionType.CHECKBOX, QuestionType.DROPDOWN, QuestionType.MULTIPLE_CHOICE)),

  TEXT_GROUP(List.of(QuestionType.PARAGRAPH, QuestionType.SHORT_ANSWER));

  private List<QuestionType> typeGroup;

  private QuestionTypeGroup(List<QuestionType> typeGroup) {
    this.typeGroup = typeGroup;
  }

  public static QuestionTypeGroup findQuestionTypeGroup(QuestionType type) {
    if (SELECT_OPTION_GROUP.typeGroup.contains(type)) {
      return SELECT_OPTION_GROUP;
    }
    if (TEXT_GROUP.typeGroup.contains(type)) {
      return TEXT_GROUP;
    }

    return null;
  }
  
}
