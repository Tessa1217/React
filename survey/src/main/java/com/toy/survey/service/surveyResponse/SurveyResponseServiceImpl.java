package com.toy.survey.service.surveyResponse;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.FormAnswer;
import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.dto.common.PageRes;
import com.toy.survey.dto.surveyForm.FormRes;
import com.toy.survey.dto.surveyResponse.FormResponseDetailRes;
import com.toy.survey.dto.surveyResponse.FormResponseReq;
import com.toy.survey.dto.surveyResponse.FormResponseRes;
import com.toy.survey.dto.surveyResponse.FormResponseSearchReq;
import com.toy.survey.exception.DuplicateDataException;
import com.toy.survey.mapper.survey.FormAnswerResMapper;
import com.toy.survey.mapper.survey.QuestionResMapper;
import com.toy.survey.repository.survey.FormAnswerRepository;
import com.toy.survey.repository.survey.FormResponseRepository;
import com.toy.survey.service.surveyForm.FormValidator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SurveyResponseServiceImpl implements SurveyResponseService {

  private final FormResponseFactory formResponseFactory;

  private final FormAnswerFactory formAnswerFactory;

  private final FormValidator formValidator;

  private final FormResponseRepository formResponseRepository;

  private final FormAnswerRepository formAnswerRepository;

  private final ResponseUserStrategyFactory strategyFactory;

  private final QuestionResMapper questionResMapper;

  private final FormAnswerResMapper formAnswerResMapper;

  private ResponseUserStrategy resolveStrategy() {
    return strategyFactory.resolve();
  };

  /**
   * 현재 로그인한 사용자가 응답한 설문조사 목록을 페이지네이션과 함께 조회
   *
   * @param pageable 페이지 정보 (사이즈, 페이지 번호 등)
   * @param searchReq 검색 요청 정보 (설문 제목, 응답 여부)
   * @param principal 현재 로그인한 사용자 정보
   * @return Page 객체에 담긴 FormResponseRes 리스트
   */  
  @Override
  public PageRes<FormResponseRes> getSurveyResponseList(Pageable pageable, 
                                                        FormResponseSearchReq searchReq) {    
    Page<FormResponseRes> formResponse = resolveStrategy().findAllWithResponded(pageable, searchReq);
    return PageRes.fromPage(formResponse);
  }

  /**
   * 응답할 설문에 대한 상세정보를 조회
   * - 응답 정보와 함께 설문(Form) 정보 및 질문/옵션 정보를 포함
   * - 비로그인도 응답 가능하기 때문에 사용자 로그인 여부에 대해서는 체크하지 않음
   *
   * @param id FormResponse ID   
   * @return FormRes 객체 (응답 상세 정보 + 설문 구성)
   * @throws IllegalArgumentException 해당 응답이 존재하지 않거나 사용자 권한이 없을 경우
   */    
  @Override
  public FormRes getSurveyTakeForm(Long id) {

    Form formWithQuestions = formValidator.validForm(id);

    checkSurveyResponseHistory(strategyFactory.resolve(), id);

    FormRes formRes = FormRes.fromEntity(formWithQuestions);

    formRes.addQuestionRes(questionResMapper.toDtoList(formWithQuestions.getQuestionList()));
    
    return formRes;
  }  

  /**
   * 설문 응답 상세 정보를 조회
   * - 해당 사용자가 작성한 응답이어야 하며,
   * - 응답 정보와 함께 설문(Form) 정보 및 질문/옵션 정보를 포함
   *
   * @param id FormResponse ID
   * @param principal 현재 로그인한 사용자 정보
   * @return FormResponseDetailRes 객체 (응답 상세 정보 + 설문 구성)
   * @throws IllegalArgumentException 해당 응답이 존재하지 않거나 사용자 권한이 없을 경우
   */  
  @Override
  public FormResponseDetailRes getSurveyResponse(Long id) { 

    FormResponse formResponse = resolveStrategy().findByIdWithAnswers(id);

    FormResponseDetailRes formResponseDetail = FormResponseDetailRes.fromEntity(formResponse);

    Form form = formResponse.getForm();

    FormRes formRes = FormRes.fromEntity(form);

    formRes.addQuestionRes(questionResMapper.toDtoList(form.getQuestionList()));    

    formResponseDetail.setForm(formRes);

    formResponseDetail.setAnswers(formAnswerResMapper.toDtoList(formResponse.getFormAnswers()));

    return formResponseDetail;

  } 


  /**
   * 설문 응답을 저장
   * - 응답자는 현재 로그인한 사용자이며, 응답은 Form 및 Question 구조에 맞게 저장
   * - 질문의 유형(텍스트/객관식/다중선택 등)에 따라 각각 다른 방식으로 FormAnswer를 생성
   *
   * @param formResponseReq 응답 요청 DTO
   * @param principal 현재 로그인한 사용자 정보
   * @return 저장된 FormResponse의 ID
   * @throws IllegalArgumentException 유효하지 않은 설문 ID, 질문 ID, 옵션 ID가 포함되어 있을 경우
   * @throws UsernameNotFoundException 사용자가 존재하지 않을 경우
   */  
  @Transactional
  @Override
  public Long insSurveyResponse(FormResponseReq formResponseReq) {

    ResponseUserStrategy strategy = resolveStrategy();

    checkSurveyResponseHistory(strategy, formResponseReq.getFormId());

    Form form = formValidator.validForm(formResponseReq.getFormId());

    // 응답 생성
    FormResponse formResponse = formResponseFactory.create(form, strategy);
    
    formResponseRepository.save(formResponse);

    if (hasAnswers(formResponseReq)) {
      List<FormAnswer> answers = formAnswerFactory.createAnswers(formResponseReq, formResponse);
      formAnswerRepository.saveAll(answers);
    }

    return formResponse.getId();

  }

  private void checkSurveyResponseHistory (ResponseUserStrategy strategy, Long formId) {
    strategy.findExistingResponse(formId)
              .ifPresent(r -> { throw new DuplicateDataException("이미 응답한 설문입니다."); });
  }

  /**
   * 설문 응답 요청에 포함된 답변 요청 존재 여부 판별
   *
   * @param formResponseReq 설문 응답 요청
   * @return 설문 응답에 포함된 답변 존재 유무
   */     
  private boolean hasAnswers(FormResponseReq formResponseReq) {
    return formResponseReq.getFormAnswers() != null
             && !formResponseReq.getFormAnswers().isEmpty();
  }
  
}
