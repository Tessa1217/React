package com.toy.survey.service.surveyResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.toy.survey.domain.survey.FormAnswer;
import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.dto.surveyResponse.FormAnswerReq;
import com.toy.survey.dto.surveyResponse.FormResponseReq;
import com.toy.survey.enums.QuestionTypeGroup;
import com.toy.survey.exception.NotFoundException;
import com.toy.survey.repository.survey.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FormAnswerFactory {

  private final QuestionRepository questionRepository;

  /**
   * 설문 응답 요청에 포함된 답변 요청을 설문 답변으로 생성
   * - 설문 응답 요청에 답변 요청이 포함된 경우
   * - 답변과 연관된 문제의 타입에 따라 설문 답변을 생성
   * - 설문 응답과 답변의 연관 관계를 매핑
   * @param formResponseReq 설문 응답 요청
   * @param formResponse 설문 응답
   * @return 생성된 설문 답변
   */      
  public List<FormAnswer> createAnswers(FormResponseReq req, FormResponse response) {
    List<FormAnswer> answers = new ArrayList<>();

    for (FormAnswerReq answerReq : req.getFormAnswers()) {
      Question question = questionRepository.getReferenceById(answerReq.getQuestionId());
      QuestionTypeGroup typeGroup = QuestionTypeGroup.findQuestionTypeGroup(answerReq.getType());

      if (typeGroup == QuestionTypeGroup.SELECT_OPTION_GROUP) {
        answers.addAll(createOptionAnswers(answerReq, question, response));
      } else if (typeGroup == QuestionTypeGroup.TEXT_GROUP) {
        answers.add(createTextAnswer(answerReq, question, response));
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
  private List<FormAnswer> createOptionAnswers(FormAnswerReq req, Question question, FormResponse response) {
    return req.getSelectedOption().stream()
        .map(optionId -> {
          OptionItem option = findOptionItemFromQuestion(question, optionId);
          return FormAnswer.builder()
              .question(question)
              .response(response)
              .selectedOption(option)
              .build();
        }).collect(Collectors.toList());
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

  /**
   * 텍스트형 설문 답변 생성
   * - 설문 답변에 연관된 문제가 텍스트형 (Paragraph, Short Answer)인 경우
   * - 설문 답변 요청의 텍스트 값을 매핑하여 설문 답변 생성
   * @param req 설문 답변 요청
   * @param question 설문 답변에 매핑된 문제 
   * @param formResponse 설문 응답
   * @return 생성된 텍스트형 설문 답변
   */   
  private FormAnswer createTextAnswer(FormAnswerReq req, Question question, FormResponse response) {
    return FormAnswer.builder()
        .answerText(req.getAnswerText())
        .question(question)
        .response(response)
        .build();
  }    

  
}
