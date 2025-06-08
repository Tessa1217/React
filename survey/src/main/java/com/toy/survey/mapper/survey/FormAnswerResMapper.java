package com.toy.survey.mapper.survey;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.toy.survey.domain.survey.FormAnswer;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.dto.surveyResponse.FormAnswerRes;
import com.toy.survey.enums.QuestionType;
import com.toy.survey.enums.QuestionTypeGroup;

@Component
public class FormAnswerResMapper {

  public List<FormAnswerRes> toDtoList(List<FormAnswer> answers) {

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
                                                      


                // 기타 응답 텍스트가 있다면 추출
                String etcAnswerText = answerList.stream()
                    .filter(ans -> ans.getSelectedOption() != null && ans.getSelectedOption().getIsEtc())
                    .map(FormAnswer::getAnswerText)
                    .findFirst()
                    .orElse(null);

                return FormAnswerRes.builder()
                    .questionId(questionId)               
                    .answerText(etcAnswerText)           
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
  
}
