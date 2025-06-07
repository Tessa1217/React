package com.toy.survey.mapper.survey;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.dto.surveyForm.OptionItemRes;
import com.toy.survey.dto.surveyForm.QuestionRes;

@Component
public class QuestionResMapper {

  public List<QuestionRes> toDtoList(List<Question> questions) {
    return questions.stream()
      .map(this::toDto)
      .collect(Collectors.toList());
  }

  public QuestionRes toDto(Question question) {
    QuestionRes res = QuestionRes.fromEntity(question);
    List<OptionItem> options = question.getOptionList();
    if (options != null && !options.isEmpty()) {
      res.addOptions(options.stream().map(OptionItemRes::fromEntity).collect(Collectors.toList()));
    }
    return res;
  }  

  
}
