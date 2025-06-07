package com.toy.survey.service.surveyForm;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.toy.survey.domain.code.Code;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.dto.surveyForm.OptionItemReq;
import com.toy.survey.dto.surveyForm.QuestionReq;
import com.toy.survey.repository.code.CodeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FormFactory {

  private final CodeRepository codeRepository;

  @Transactional
  public Form createForm(FormReq req, User user) {
    Form form = req.toEntity();
    
    form.setUser(user);

    List<Question> questions = req.getQuestionList().stream()
        .map(q -> {
            Question question = q.toEntity();
            Code code = codeRepository.findByCode(q.getType().getCode())
                .orElseThrow(() -> new RuntimeException("문제 유형 코드가 없습니다."));
            question.setQuestionTypeCode(code);
            question.setOptions(convertOptions(q));
            return question;
        })
        .toList();

    form.addQuestions(questions);
    return form;
  }

  private List<OptionItem> convertOptions(QuestionReq q) {
      return Optional.ofNullable(q.getOptions())
          .orElse(List.of())
          .stream()
          .map(OptionItemReq::toEntity)
          .toList();
  }  
  
}
