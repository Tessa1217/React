package com.toy.survey.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.toy.survey.domain.code.Code;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.surveyForm.FormRequest;
import com.toy.survey.dto.surveyForm.QuestionRequest;
import com.toy.survey.repository.code.CodeRepository;
import com.toy.survey.repository.survey.SurveyFormRepository;
import com.toy.survey.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyFormServiceImpl implements SurveyFormService {
  
  private final SurveyFormRepository surveyFormRepository;

  private final UserRepository userRepository;

  private final CodeRepository codeRepository;

  @Override
  public void saveSurvey(FormRequest formRequest) {

    User user = userRepository.findByEmail("yj.kwon@fusionsoft.co.kr");

    Form form = formRequest.toEntity();
    form.setUser(user);

    List<Question> questionList = formRequest.getQuestionList()
                                             .stream()
                                             .map(q -> {
                                              Question question = q.toEntity();
                                              Code code = codeRepository.findByCode(q.getType().getCode());
                                              question.setQuestionTypeCode(code);
                                              return question;
                                             })
                                             .collect(Collectors.toList());


    form.addQuestions(
      questionList != null ? questionList
                           : List.of());                
    
    surveyFormRepository.save(form);

  }
  
}
