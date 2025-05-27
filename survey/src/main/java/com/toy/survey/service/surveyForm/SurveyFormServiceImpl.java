package com.toy.survey.service.surveyForm;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.toy.survey.domain.code.Code;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.dto.surveyForm.FormRes;
import com.toy.survey.dto.surveyForm.OptionItemReq;
import com.toy.survey.dto.surveyForm.QuestionReq;
import com.toy.survey.repository.code.CodeRepository;
import com.toy.survey.repository.surveyForm.SurveyFormQueryDSLRepository;
import com.toy.survey.repository.surveyForm.SurveyFormRepository;
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
    Page<Form> formPage = surveyFormRepository.findAllByOrderByCreatedAtDesc(pageable);    
    return formPage.map(FormRes::fromEntity);
  }

  @Override
  public FormRes getSurveyForm(Long id) {
    return surveyFormQueryDSLRepository
                       .findByIdWithQuestions(id);
  }  

  @Override
  @Transactional
  public void saveSurvey(FormReq formRequest) {

    User user = userRepository.findByEmail("yj.kwon@fusionsoft.co.kr").orElseThrow(() -> new UsernameNotFoundException("이메일 없습니다."));

    Form form = formRequest.toEntity();
    form.setUser(user);

    List<Question> questionList = formRequest.getQuestionList()
                                             .stream()
                                             .map(q -> {
                                                Question question = generateNewQuestion(q);
                                                question.addOptions(convertQuestionOptionItems(q));
                                                return question;
                                              })
                                             .collect(Collectors.toList());


    form.addQuestions(
      questionList != null ? questionList
                           : List.of());                
    
    surveyFormRepository.save(form);

  }

  private Question generateNewQuestion(QuestionReq questionReq) {
    Question question = questionReq.toEntity();
    Code code = codeRepository.findByCode(questionReq.getType().getCode())
                              .orElseThrow(() -> new RuntimeException("해당하는 문제 유형 코드가 없습니다."));                                                                        
    question.setQuestionTypeCode(code);    
    return question;
  }

  private List<OptionItem> convertQuestionOptionItems(QuestionReq question) {
    List<OptionItemReq> options = Optional.ofNullable(question.getOptions()).orElse(List.of());

    return options.stream()
                  .map(OptionItemReq::toEntity)
                  .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void updateSurvey(FormReq formRequest) {

    Form form = surveyFormRepository.findById(formRequest.getId()).orElseThrow(() -> new IllegalArgumentException("해당 설문지가 존재하지 않습니다."));

    form.update(formRequest);

    Map<Long, Question> existingQuestionMap = form.getQuestionList().stream()
        .collect(Collectors.toMap(Question::getId, q -> q));    

    for (QuestionReq req : formRequest.getQuestionList()) {
      if (req.getId() != null && existingQuestionMap.containsKey(req.getId())) {
        Question existing = existingQuestionMap.get(req.getId());
        existing.update(req);
        updateOptions(existing, req.getOptions());
        existingQuestionMap.remove(existing.getId());
      } else {      
        Question question = generateNewQuestion(req);
        question.addOptions(convertQuestionOptionItems(req));            
        form.addQuestion(question);                                                    
      }
    }

    form.getQuestionList().removeAll(existingQuestionMap.values());

  }

  private void updateOptions(Question question, List<OptionItemReq> optionList) {
    
    if (optionList == null) {
      return;  
    }

    Map<Long, OptionItem> existingMap = question.getOptionList().stream()
        .collect(Collectors.toMap(OptionItem::getId, o -> o));    

    for (OptionItemReq optionReq : optionList) {
      if (optionReq.getId() != null && existingMap.containsKey(optionReq.getId())) {
        OptionItem existing = existingMap.get(optionReq.getId());
        existing.update(optionReq);        
        existingMap.remove(optionReq.getId());
      } else {
        OptionItem newOption = optionReq.toEntity();
        question.addOption(newOption);
      }
    }

    question.getOptionList().removeAll(existingMap.values());

  }



  
}
