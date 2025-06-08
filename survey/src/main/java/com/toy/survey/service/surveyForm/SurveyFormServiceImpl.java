package com.toy.survey.service.surveyForm;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.common.PageRes;
import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.dto.surveyForm.FormRes;
import com.toy.survey.dto.surveyForm.FormSearchReq;
import com.toy.survey.mapper.survey.QuestionResMapper;
import com.toy.survey.repository.survey.FormRepository;
import com.toy.survey.repository.surveyForm.SurveyFormQueryDSLRepository;
import com.toy.survey.service.user.UserContextService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyFormServiceImpl implements SurveyFormService {

  private final UserContextService userContextService;

  private final FormFactory formFactory;

  private final FormUpdater formUpdater;

  private final FormValidator formValidator;

  private final FormRepository formRepository;

  private final SurveyFormQueryDSLRepository surveyFormQueryDSLRepository;

  private final QuestionResMapper questionResMapper;

  
  @Override
  public PageRes<FormRes> getSurveyFormList(Pageable pageable, FormSearchReq searchReq) {
    Long userId = userContextService.getCurrentUserIdOrThrow();
    Page<FormRes> formRes = surveyFormQueryDSLRepository.findAllWithSearchCondition(pageable, userId, searchReq);    
    return PageRes.fromPage(formRes, searchReq);
  }

  @Override
  public FormRes getSurveyForm(Long id) {

    Long userId = userContextService.getCurrentUserIdOrThrow();
    Form formWithQuestions = formValidator.validForm(id);
    formValidator.isFormOwnedByCurrentUser(userId, formWithQuestions);                                  
    FormRes formRes = FormRes.fromEntity(formWithQuestions);
    formRes.addQuestionRes(questionResMapper.toDtoList(formWithQuestions.getQuestionList()));
    
    return formRes;

  }  

  @Override
  @Transactional
  public void saveSurvey(FormReq formRequest) {

    User user = userContextService.getCurrentUserOrThrow();
    Form form = formFactory.createForm(formRequest, user);           
    formRepository.save(form);

  }

  @Override
  @Transactional
  public void updateSurvey(FormReq formRequest) {

    Long userId = userContextService.getCurrentUserIdOrThrow();                                         
    Form form = formValidator.validForm(formRequest.getId());
    formValidator.isFormOwnedByCurrentUser(userId, form);
    formUpdater.update(form, formRequest);

  }

  @Override
  @Transactional
  public void deleteSurvey(List<Long> ids) {
    for (Long id : ids) {
      Form form = formValidator.validForm(id);
      formRepository.delete(form);
    }
  }
 
}
