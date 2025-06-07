package com.toy.survey.service.surveyForm;

import org.springframework.stereotype.Component;

import com.toy.survey.domain.survey.Form;
import com.toy.survey.exception.ForbiddenException;
import com.toy.survey.exception.NotFoundException;
import com.toy.survey.repository.surveyForm.SurveyFormQueryDSLRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FormValidator {

  private final SurveyFormQueryDSLRepository surveyFormQueryDSLRepository;


  /**
   * 유효한 설문지 조회
   *
   * @param formId 설문지 ID   
   * @return 저장된 설문지
   * @throws NotFoundException 유효하지 않은 설문 ID인 경우
   */      
  public Form validForm(Long formId) {
    return surveyFormQueryDSLRepository.findByIdWithQuestions(formId)
                              .orElseThrow(() -> new NotFoundException("해당 설문지가 존재하지 않습니다."));
  }

  public void isFormOwnedByCurrentUser (Long userId, Form form) {
    if (form.getUser() == null) {
      throw new NotFoundException("설문 작성자를 찾을 수 없습니다.");
    }
    Long formUserId = form.getUser().getId();
    if (!userId.equals(formUserId)) {
      throw new ForbiddenException("작성자만 설문을 수정할 수 있습니다.");
    }    
  } 
  
}
