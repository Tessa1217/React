package com.toy.survey.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.toy.survey.domain.code.Code;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.dto.surveyForm.FormRes;
import com.toy.survey.dto.surveyForm.OptionItemReq;
import com.toy.survey.repository.code.CodeRepository;
import com.toy.survey.repository.survey.SurveyFormQueryDSLRepository;
import com.toy.survey.repository.survey.SurveyFormRepository;
import com.toy.survey.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyFormServiceImpl implements SurveyFormService {
  
  private final SurveyFormRepository surveyFormRepository;

  private final SurveyFormQueryDSLRepository surveyFormQueryDSLRepository;

  private final UserRepository userRepository;

  private final CodeRepository codeRepository;
  
  @Override
  public Page<FormRes> getSurveyFormList(Pageable pageable) {
    Page<Form> formPage = surveyFormRepository.findAll(pageable);    
    return formPage.map(FormRes::fromEntity);
  }

  @Override
  public FormRes getSurveyForm(Long id) {
    Form form = surveyFormRepository.findById(id).orElseThrow(() -> new RuntimeException("설문이 없습니다."));
    return FormRes.fromEntity(form);    
  }  

  @Override
  public void saveSurvey(FormReq formRequest) {

    User user = userRepository.findByEmail("yj.kwon@fusionsoft.co.kr");

    Form form = formRequest.toEntity();
    form.setUser(user);

    List<Question> questionList = formRequest.getQuestionList()
                                             .stream()
                                             .map(q -> {
                                              Question question = q.toEntity();
                                              Code code = codeRepository.findByCode(q.getType().getCode())
                                                                        .orElseThrow(() -> new RuntimeException("해당하는 문제 유형 코드가 없습니다."));                                                                        
                                              question.setQuestionTypeCode(code);
                                              if (q.getOptions() != null) {
                                                List<OptionItem> options = q.getOptions()
                                                                            .stream()
                                                                            .map(OptionItemReq::toEntity)
                                                                            .collect(Collectors.toList());
                                                                            question.addOptions(options);                                                                              
                                              }
                                              return question;
                                             })
                                             .collect(Collectors.toList());


    form.addQuestions(
      questionList != null ? questionList
                           : List.of());                
    
    surveyFormRepository.save(form);

  }



  
}
