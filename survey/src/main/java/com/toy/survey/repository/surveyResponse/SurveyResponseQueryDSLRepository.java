package com.toy.survey.repository.surveyResponse;

import static com.querydsl.core.types.ExpressionUtils.as;
import static com.querydsl.core.types.Projections.constructor;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.toy.survey.domain.code.QCode;
import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.QForm;
import com.toy.survey.domain.survey.QFormAnswer;
import com.toy.survey.domain.survey.QFormResponse;
import com.toy.survey.domain.survey.QOptionItem;
import com.toy.survey.domain.survey.QQuestion;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.domain.user.QUser;
import com.toy.survey.dto.surveyResponse.FormResponseRes;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SurveyResponseQueryDSLRepository {

  private final JPAQueryFactory queryFactory;

  private QForm form = QForm.form;

  private QUser user = QUser.user;

  private QCode code = QCode.code1;

  private QFormResponse formResponse = QFormResponse.formResponse;

  private QFormAnswer formAnswer = QFormAnswer.formAnswer;

  private QQuestion question = QQuestion.question;

  private QOptionItem optionItem = QOptionItem.optionItem;
  
  @Transactional(readOnly = true)
  public Page<FormResponseRes> findAllWithResponsed(Pageable pageable, Long userId) {
                                                  
    List<FormResponseRes> responseList = queryFactory
                                           .select(constructor(FormResponseRes.class,
                                              form.id,
                                              form.title,
                                              form.description,
                                              form.isPublic,
                                              form.requiresLogin,
                                              form.expiresAt,                                              
                                              as(fetchFormResponseId(userId), "responseId")                                                                       
                                            ))
                                          .from(form)        
                                          .where(eqIsPublic(userId))                                  
                                          .offset(pageable.getOffset())
                                          .limit(pageable.getPageSize())
                                          .orderBy(form.createdAt.desc())
                                          .fetch();

    long total = queryFactory
        .select(form.count())
        .from(form)
        .fetchOne();

    return new PageImpl<>(responseList, pageable, total);       

  }

  private Expression<Long> fetchFormResponseId (Long userId) {

    if (userId == null) {
      return Expressions.nullExpression(Long.class);
    }
      return JPAExpressions.select(formResponse.id)
                                        .from(formResponse)
                                        .where(
                                        formResponse.form.id.eq(form.id)
                                        .and(formResponse.user.id.eq(userId))
                                        );  
  };

  private BooleanExpression eqIsPublic(Long userId) {
    if (userId != null) {
      return null;
    }
    return form.isPublic.isTrue();
  }

  @Transactional(readOnly = true)
  public FormResponse findByIdWithAnswers(Long Id, Long userId) {
    FormResponse response = queryFactory.selectFrom(formResponse)
                .leftJoin(formResponse.user, user).fetchJoin()
                .leftJoin(formResponse.form, form).fetchJoin()                
                .leftJoin(formResponse.formAnswers, formAnswer).fetchJoin()
                .leftJoin(formAnswer.question, question).fetchJoin()                
                .leftJoin(formAnswer.selectedOption, optionItem).fetchJoin()
                .where(
                  formResponse.id.eq(Id).and(
                    formResponse.user.id.eq(userId)
                ))
                .fetchOne();

    List<Question> questions = queryFactory.selectFrom(question)
                                           .leftJoin(question.questionType, code).fetchJoin()
                                           .where(question.form.id.eq(response.getForm().getId()))
                                           .fetch();                                        

    List<Long> questionIds = questions.stream()
                                      .map(Question::getId)
                                      .collect(Collectors.toList());
                                      
    List<OptionItem> allOptions = queryFactory.selectFrom(optionItem)
                                              .leftJoin(optionItem.question, question).fetchJoin()
                                              .where(optionItem.question.id.in(questionIds))
                                              .fetch();
                                              
    Map<Long, List<OptionItem>> optionMap = allOptions.stream()
        .collect(Collectors.groupingBy(opt -> opt.getQuestion().getId()));

    questions.forEach(q -> {
        q.setOptions(optionMap.getOrDefault(q.getId(), List.of()));
    });            
    
    response.getForm().setQuestions(questions);   

    return response;                
  }

  
}
