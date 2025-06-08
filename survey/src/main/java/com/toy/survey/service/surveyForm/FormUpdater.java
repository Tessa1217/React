package com.toy.survey.service.surveyForm;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.toy.survey.domain.code.Code;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.dto.surveyForm.OptionItemReq;
import com.toy.survey.dto.surveyForm.QuestionReq;
import com.toy.survey.repository.code.CodeRepository;
import com.toy.survey.repository.survey.OptionItemRepository;
import com.toy.survey.repository.survey.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FormUpdater {

  private final CodeRepository codeRepository;

  private final QuestionRepository questionRepository;

  private final OptionItemRepository optionItemRepository;  

  public void update(Form form, FormReq formRequest) {
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
        question.setOptions(convertQuestionOptionItems(req));            
        form.addQuestion(question);                                                    
      }
    }

    form.getQuestionList().removeAll(existingQuestionMap.values());

    // questionRepository.deleteAll(existingQuestionMap.values());    
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

    // optionItemRepository.deleteAll(existingMap.values());
    

  }
  
}
