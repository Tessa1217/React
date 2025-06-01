package com.toy.survey.service.surveyForm;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import com.toy.survey.dto.surveyForm.OptionItemRes;
import com.toy.survey.dto.surveyForm.QuestionReq;
import com.toy.survey.dto.surveyForm.QuestionRes;
import com.toy.survey.exception.ForbiddenException;
import com.toy.survey.exception.NotFoundException;
import com.toy.survey.exception.UnauthorizedException;
import com.toy.survey.repository.code.CodeRepository;
import com.toy.survey.repository.survey.FormRepository;
import com.toy.survey.repository.survey.OptionItemRepository;
import com.toy.survey.repository.survey.QuestionRepository;
import com.toy.survey.repository.surveyForm.SurveyFormQueryDSLRepository;
import com.toy.survey.repository.user.UserRepository;
import com.toy.survey.service.user.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyFormServiceImpl implements SurveyFormService {

  private final UserService userService;
  
  private final FormRepository formRepository;

  private final SurveyFormQueryDSLRepository surveyFormQueryDSLRepository;

  private final UserRepository userRepository;

  private final CodeRepository codeRepository;

  private final QuestionRepository questionRepository;

  private final OptionItemRepository optionItemRepository;
  
  @Override
  public Page<FormRes> getSurveyFormList(Pageable pageable) {
    Long userId = userService.getCurrentUserId().orElse(null);
    if (userId == null) {
      return Page.empty();
    }
    Page<Form> formPage = formRepository.findAllByUserIdOrderByCreatedAtDesc(userId, pageable);    
    return formPage.map(FormRes::fromEntity);
  }

  @Override
  public FormRes getSurveyForm(Long id) {

    Long userId = userService.getCurrentUserId()
                             .orElseThrow(() -> new UnauthorizedException("로그인한 사용자만 접근 가능합니다."));

    Form formWithQuestions = surveyFormQueryDSLRepository
                                    .findByIdWithQuestions(id)
                                    .orElseThrow(() -> new NotFoundException("유효하지 않은 설문입니다"));

    if (!userId.equals(formWithQuestions.getUser().getId())) {
      throw new ForbiddenException("작성자가 아니면 조회할 수 없습니다.");
    }                                    

    FormRes formRes = FormRes.fromEntity(formWithQuestions);

    formRes.addQuestionRes(
      formWithQuestions.getQuestionList().stream().map(q -> {
        QuestionRes qr = QuestionRes.fromEntity(q);
        if (q.getOptionList() != null && !q.getOptionList().isEmpty()) {
          qr.addOptions(
            q.getOptionList().stream().map(o -> OptionItemRes.fromEntity(o)).collect(Collectors.toList())
          );          
        }
        return qr;
      }).collect(Collectors.toList())
    );
    
    return formRes;

  }  

  @Override
  @Transactional
  public void saveSurvey(FormReq formRequest) {

    Long userId = userService.getCurrentUserId()
                             .orElseThrow(() -> new UnauthorizedException("로그인한 사용자만 접근 가능합니다."));    

    User user = userRepository.findById(userId)
                              .orElseThrow(() -> new NotFoundException("유효한 사용자가 아닙니다."));

    Form form = formRequest.toEntity();
    form.setUser(user);

    List<Question> questionList = formRequest.getQuestionList()
                                             .stream()
                                             .map(q -> {
                                                Question question = generateNewQuestion(q);
                                                question.setOptions(convertQuestionOptionItems(q));
                                                return question;
                                              })
                                             .collect(Collectors.toList());


    form.addQuestions(
      questionList != null ? questionList
                           : List.of());                
    
    formRepository.save(form);

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

    Long userId = userService.getCurrentUserId()
                             .orElseThrow(() -> new UnauthorizedException("로그인한 사용자만 접근 가능합니다."));                                         

    Form form = formRepository.findById(formRequest.getId())
                              .orElseThrow(() -> new NotFoundException("해당 설문지가 존재하지 않습니다."));

    if (!userId.equals(form.getUser().getId())) {
      throw new ForbiddenException("작성자만 설문을 수정할 수 있습니다.");
    }

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

    questionRepository.deleteAll(existingQuestionMap.values());

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

    optionItemRepository.deleteAll(existingMap.values());
    

  }



  
}
