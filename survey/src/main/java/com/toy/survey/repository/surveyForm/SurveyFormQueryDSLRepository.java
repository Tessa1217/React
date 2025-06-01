package com.toy.survey.repository.surveyForm;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.toy.survey.domain.code.QCode;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.QForm;
import com.toy.survey.domain.survey.QOptionItem;
import com.toy.survey.domain.survey.QQuestion;
import com.toy.survey.domain.user.QUser;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SurveyFormQueryDSLRepository {

  private final JPAQueryFactory queryFactory;

  private QForm form = QForm.form;

  private QUser user = QUser.user;

  private QQuestion question = QQuestion.question;

  private QOptionItem optionItem = QOptionItem.optionItem;

  private QCode code = QCode.code1;
    
  @Transactional(readOnly = true)
  public Optional<Form> findByIdWithQuestions(Long id) {

    Optional<Form> optionalFormWithQuestions = Optional.ofNullable(
                                                   queryFactory.selectFrom(form)
                                                               .leftJoin(form.user, user).fetchJoin()
                                                               .leftJoin(form.questionList, question).fetchJoin()    
                                                               .leftJoin(question.questionType, code).fetchJoin()
                                                               .where(form.id.eq(id))
                                                               .fetchOne());  

    if (optionalFormWithQuestions.isEmpty()) {
      return Optional.empty();
    } 
    
    Form formWithQuestions = optionalFormWithQuestions.get();
    
    // MultipleBagFetchException으로 인해서 분리해서 조회                                         
    if (!formWithQuestions.getQuestionList().isEmpty()) {
     List<OptionItem> options = queryFactory.selectFrom(optionItem)                  
                  .leftJoin(optionItem.question, question).fetchJoin()
                  .where(optionItem.question.in(formWithQuestions.getQuestionList()))
                  .fetch();  // OptionItem을 별도 쿼리로 한번에 로딩

      formWithQuestions.getQuestionList().forEach(questionEntity -> {
          var optionsForQuestion = options.stream()
                                              .filter(option -> option.getQuestion().equals(questionEntity))
                                              .collect(Collectors.toList());
          questionEntity.setOptions(optionsForQuestion);
      });                        
    }    

    return Optional.of(formWithQuestions);

  }
  
}
