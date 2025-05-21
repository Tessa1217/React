package com.toy.survey.repository.survey;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.QForm;
import com.toy.survey.domain.survey.QOptionItem;
import com.toy.survey.domain.survey.QQuestion;
import com.toy.survey.dto.surveyForm.FormRes;
import com.toy.survey.dto.surveyForm.OptionItemRes;
import com.toy.survey.dto.surveyForm.QuestionRes;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SurveyFormQueryDSLRepository {

  private final JPAQueryFactory queryFactory;

  private QForm form = QForm.form;

  private QQuestion question = QQuestion.question;

  private QOptionItem optionItem = QOptionItem.optionItem;
  
  @Transactional(readOnly = true)
  public FormRes findByIdWithQuestions(Long id) {

    Form formWithQuestions = queryFactory.selectFrom(form)
                                         .leftJoin(form.questionList, question).fetchJoin()                                         
                                         .where(form.id.eq(id))
                                         .fetchOne();  
    
    // MultipleBagFetchException으로 인해서 분리해서 조회                                         
    if (formWithQuestions != null && !formWithQuestions.getQuestionList().isEmpty()) {
     List<OptionItem> options = queryFactory.selectFrom(optionItem)
                  .leftJoin(optionItem.question, question).fetchJoin()
                  .where(optionItem.question.in(formWithQuestions.getQuestionList()))
                  .fetch();  // OptionItem을 별도 쿼리로 한번에 로딩

      formWithQuestions.getQuestionList().forEach(questionEntity -> {
          var optionsForQuestion = options.stream()
                                              .filter(option -> option.getQuestion().equals(questionEntity))
                                              .collect(Collectors.toList());
          questionEntity.addOptions(optionsForQuestion);
      });                        
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
  
}
