package com.toy.survey.service.surveyResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.FormAnswer;
import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.surveyForm.FormRes;
import com.toy.survey.dto.surveyForm.OptionItemRes;
import com.toy.survey.dto.surveyForm.QuestionRes;
import com.toy.survey.dto.surveyResponse.FormAnswerReq;
import com.toy.survey.dto.surveyResponse.FormAnswerRes;
import com.toy.survey.dto.surveyResponse.FormResponseDetailRes;
import com.toy.survey.dto.surveyResponse.FormResponseReq;
import com.toy.survey.dto.surveyResponse.FormResponseRes;
import com.toy.survey.enums.QuestionType;
import com.toy.survey.enums.QuestionTypeGroup;
import com.toy.survey.exception.NotFoundException;
import com.toy.survey.exception.UnauthorizedException;
import com.toy.survey.repository.survey.FormAnswerRepository;
import com.toy.survey.repository.survey.FormResponseRepository;
import com.toy.survey.repository.survey.QuestionRepository;
import com.toy.survey.repository.surveyForm.SurveyFormQueryDSLRepository;
import com.toy.survey.repository.surveyResponse.SurveyResponseQueryDSLRepository;
import com.toy.survey.repository.user.UserRepository;
import com.toy.survey.service.user.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SurveyResponseServiceImpl implements SurveyResponseService {

  private final UserService userService;

  private final SurveyResponseQueryDSLRepository surveyResponseQueryDSLRepository;

  private final UserRepository userRepository;

  private final SurveyFormQueryDSLRepository surveyFormQueryDSLRepository;

  private final QuestionRepository questionRepository;

  private final FormResponseRepository formResponseRepository;

  private final FormAnswerRepository formAnswerRepository;

  /**
   * 현재 로그인한 사용자가 응답한 설문조사 목록을 페이지네이션과 함께 조회
   *
   * @param pageable 페이지 정보 (사이즈, 페이지 번호 등)
   * @param principal 현재 로그인한 사용자 정보
   * @return Page 객체에 담긴 FormResponseRes 리스트
   */  
  @Override
  public Page<FormResponseRes> getSurveyResponseList(Pageable pageable) {    
    Long userId = userService.getCurrentUserId().orElse(null);
    return surveyResponseQueryDSLRepository.findAllWithResponsed(pageable, userId);  
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

    Long userId = userService.getCurrentUserId().orElseThrow(() -> new UnauthorizedException("로그인 한 사용자만 조회 가능합니다."));

    FormResponse formResponse = surveyResponseQueryDSLRepository.findByIdWithAnswers(id, userId);

    FormResponseDetailRes formResponseDetail = FormResponseDetailRes.fromEntity(formResponse);

    Form form = formResponse.getForm();

    FormRes formRes = FormRes.fromEntity(form);

    formRes.addQuestionRes(
      form.getQuestionList().stream().map(q -> {
        QuestionRes qr = QuestionRes.fromEntity(q);
        if (q.getOptionList() != null && !q.getOptionList().isEmpty()) {
          qr.addOptions(
            q.getOptionList().stream().map(o -> OptionItemRes.fromEntity(o)).collect(Collectors.toList())
          );          
        }
        return qr;
      }).collect(Collectors.toList())
    );    

    formResponseDetail.setForm(formRes);

    formResponseDetail.setAnswers(groupAnswerRes(formResponse.getFormAnswers()));

    return formResponseDetail;

  } 

  private List<FormAnswerRes> groupAnswerRes(List<FormAnswer> answers) {

      Map<Long, List<FormAnswer>> groupedAnswers = answers.stream()          
                                                         .collect(
                                                          Collectors.groupingBy(answer -> answer.getQuestion().getId())
                                                                 );    
      return groupedAnswers.entrySet().stream()
          .map(entry -> {
              Long questionId = entry.getKey();
              List<FormAnswer> answerList = entry.getValue();         
              Question question = answerList.get(0).getQuestion();
              QuestionType questionType = QuestionType.fromCode(question.getQuestionType().getCode());
        
              if (QuestionTypeGroup.SELECT_OPTION_GROUP == QuestionTypeGroup.findQuestionTypeGroup(questionType)) {
                List<Long> selectedOptionIds = answerList.stream()
                                                      .map(ans -> ans.getSelectedOption().getId())
                                                      .collect(Collectors.toList());            
                return FormAnswerRes.builder()
                    .questionId(questionId)                          
                    .selectedOption(selectedOptionIds)
                    .build();                    

              } else {
                return FormAnswerRes.builder()
                  .questionId(questionId)                  
                  .answerText(answerList.get(0).getAnswerText()) // 하나만 존재
                  .build();                
              }
              
          })
          .collect(Collectors.toList());
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

    Long userId = userService.getCurrentUserId()
                             .orElseThrow(() -> new UnauthorizedException("로그인한 사용자만 접근 가능합니다."));
    
    Form form = getValidForm(formResponseReq.getFormId());

    User user = getValidUser(userId);

    FormResponse formResponse = FormResponse.builder()
                                           .form(form)
                                           .user(user)
                                           .submittedAt(LocalDateTime.now())
                                           .build();     
                                           
    formResponseRepository.save(formResponse);

    if (hasAnswers(formResponseReq)) {
      List<FormAnswer> answers = buildAnswers(formResponseReq, formResponse);
      formAnswerRepository.saveAll(answers);
    }

    return formResponse.getId();

  }

  /**
   * 유효한 설문지 조회
   *
   * @param formId 설문지 ID   
   * @return 저장된 설문지
   * @throws NotFoundException 유효하지 않은 설문 ID인 경우
   */    
  private Form getValidForm(Long formId) {
    return surveyFormQueryDSLRepository.findByIdWithQuestions(formId)
                   .orElseThrow(() -> new NotFoundException("유효하지 않은 설문조사 입니다."));
  }

  /**
   * 유효한 사용자 조회
   *
   * @param id 사용자 ID   
   * @return 저장된 사용자
   * @throws NotFoundException 유효하지 않은 사용자 ID인 경우
   */   
  private User getValidUser(Long id) {
    return userRepository.findById(id)
               .orElseThrow(() -> new NotFoundException("해당 유저가 존재하지 않습니다."));
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

  /**
   * 설문 응답 요청에 포함된 답변 요청을 설문 답변으로 생성
   * - 설문 응답 요청에 답변 요청이 포함된 경우
   * - 답변과 연관된 문제의 타입에 따라 설문 답변을 생성
   * - 설문 응답과 답변의 연관 관계를 매핑
   * @param formResponseReq 설문 응답 요청
   * @param formResponse 설문 응답
   * @return 생성된 설문 답변
   */       
  private List<FormAnswer> buildAnswers(FormResponseReq req, FormResponse formResponse) {
      List<FormAnswer> answers = new ArrayList<>();

      for (FormAnswerReq answerReq : req.getFormAnswers()) {
          Question question = questionRepository.getReferenceById(answerReq.getQuestionId());
          QuestionTypeGroup typeGroup = QuestionTypeGroup.findQuestionTypeGroup(answerReq.getType());

          if (QuestionTypeGroup.SELECT_OPTION_GROUP == typeGroup) {
              answers.addAll(buildOptionAnswers(answerReq, question, formResponse));
          } else if (QuestionTypeGroup.TEXT_GROUP == typeGroup) {
              answers.add(buildTextAnswer(answerReq, question, formResponse));
          }
      }

      return answers;
  }  

  /**
   * 옵션 선택형 설문 답변 생성
   * - 설문 답변에 연관된 문제가 옵션 선택형 (Multiple Choice, Dropdown, Checkbox)인 경우
   * - 선택된 옵션을 찾아 설문 답변과 연관 관계 매핑하여 생성
   * @param req 설문 답변 요청
   * @param question 설문 답변에 매핑된 문제 
   * @param formResponse 설문 응답
   * @return 생성된 옵션 선택형 설문 답변
   */      
  private List<FormAnswer> buildOptionAnswers(FormAnswerReq req, Question question, FormResponse response) {
      return req.getSelectedOption().stream()
          .map(optionId -> {
              OptionItem option = findOptionItemFromQuestion(question, optionId);
              return FormAnswer.builder()
                  .question(question)
                  .response(response)
                  .selectedOption(option)
                  .build();
          })
          .collect(Collectors.toList());
  }

  /**
   * 텍스트형 설문 답변 생성
   * - 설문 답변에 연관된 문제가 텍스트형 (Paragraph, Short Answer)인 경우
   * - 설문 답변 요청의 텍스트 값을 매핑하여 설문 답변 생성
   * @param req 설문 답변 요청
   * @param question 설문 답변에 매핑된 문제 
   * @param formResponse 설문 응답
   * @return 생성된 텍스트형 설문 답변
   */   
  private FormAnswer buildTextAnswer(FormAnswerReq req, Question question, FormResponse response) {
      return FormAnswer.builder()
          .answerText(req.getAnswerText())
          .question(question)
          .response(response)
          .build();
  }  

  /**
   * 특정 Question 객체에서 주어진 옵션 ID에 해당하는 OptionItem을 조회
   * - Question의 옵션 목록 내에서 직접 탐색
   *
   * @param question 조회할 Question 객체
   * @param optionItemId 찾고자 하는 OptionItem의 ID
   * @return OptionItem 객체
   * @throws NotFoundException 해당 옵션 ID가 질문에 포함되어 있지 않을 경우
   */  
  private OptionItem findOptionItemFromQuestion(Question question, Long optionItemId) {    
    return question.getOptionList()
                   .stream()
                   .filter((o) -> o.getId().equals(optionItemId))
                   .findFirst()
                   .orElseThrow(() -> new NotFoundException("유효하지 않은 설문 옵션입니다."));
  }
  
}
