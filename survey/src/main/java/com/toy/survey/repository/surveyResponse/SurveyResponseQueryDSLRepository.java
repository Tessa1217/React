package com.toy.survey.repository.surveyResponse;

import static com.querydsl.core.types.ExpressionUtils.as;
import static com.querydsl.core.types.Projections.constructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
import com.toy.survey.domain.survey.QForm;
import com.toy.survey.domain.survey.QFormAnswer;
import com.toy.survey.domain.survey.QFormResponse;
import com.toy.survey.domain.survey.QOptionItem;
import com.toy.survey.domain.survey.QQuestion;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.domain.user.QUser;
import com.toy.survey.dto.surveyResponse.FormResponseRes;
import com.toy.survey.dto.surveyResponse.FormResponseSearchReq;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SurveyResponseQueryDSLRepository {

  private final JPAQueryFactory queryFactory;

  private static final QForm form = QForm.form;

  private static final QUser user = QUser.user;

  private static final QCode code = QCode.code1;

  private static final QFormResponse formResponse = QFormResponse.formResponse;

  private static final QFormAnswer formAnswer = QFormAnswer.formAnswer;

  private static final QQuestion question = QQuestion.question;

  private static final QOptionItem optionItem = QOptionItem.optionItem;

  
  @Transactional(readOnly = true)
  public Page<FormResponseRes> findAllWithRespondedByUser(Pageable pageable, 
                                                    Long userId,                                                     
                                                    FormResponseSearchReq searchReq) {
                                                          
    BooleanExpression userCondition = formResponse.user.id.eq(userId);
    return findAllWithResponded(pageable, searchReq, userCondition);

  }

  @Transactional(readOnly = true)
  public Page<FormResponseRes> findAllWithRespondedByAnonymousUser(Pageable pageable, 
                                                    String anonymousId,
                                                    FormResponseSearchReq searchReq) {
    BooleanExpression userCondition = formResponse.anonymousId.eq(anonymousId);                                                      
    return findAllWithResponded(pageable, searchReq, userCondition, List.of(eqIsPublic(), eqRequiresLogin()));                                                      

  }    

  public Page<FormResponseRes> findAllWithResponded(Pageable pageable, FormResponseSearchReq searchReq,
                                                    BooleanExpression userCondition) {
    return findAllWithResponded(pageable, searchReq, userCondition, List.of());                                                      
  }

  public Page<FormResponseRes> findAllWithResponded(Pageable pageable, FormResponseSearchReq searchReq,
                                                    BooleanExpression userCondition,
                                                    List<BooleanExpression> userRelatedConditions) {

    List<BooleanExpression> whereConditions = buildWhereConditions(searchReq, userCondition, userRelatedConditions);            

    long total = queryFactory
        .select(form.count())
        .from(form)
        .where(
          whereConditions.toArray(new BooleanExpression[0])
        )           
        .fetchOne();
        
    if (total == 0) {
      return Page.empty();
    }                                                     
                                                   
    List<FormResponseRes> responseList = queryFactory
                                           .select(constructor(FormResponseRes.class,
                                              form.id,
                                              form.title,
                                              form.description,
                                              form.isPublic,
                                              form.requiresLogin,
                                              form.expiresAt,                                              
                                              as(fetchFormResponseId(userCondition), "responseId")                                                                       
                                            ))
                                          .from(form)        
                                          .where(
                                            whereConditions.toArray(new BooleanExpression[0])
                                          )                                  
                                          .offset(pageable.getOffset())
                                          .limit(pageable.getPageSize())
                                          .orderBy(form.createdAt.desc())
                                          .fetch();

    return new PageImpl<>(responseList, pageable, total);       

  }

  @Transactional(readOnly = true)
  public FormResponse findByIdWithAnswersByUser(Long id, Long userId) {
    BooleanExpression userCondition = formResponse.user.id.eq(userId);
    return findByIdWithAnswers(id, userCondition);
  }

  @Transactional(readOnly = true)
  public FormResponse findByIdWithAnswersByAnonymousUser(Long id, String anonymousId) {
    BooleanExpression userCondition = formResponse.anonymousId.eq(anonymousId);
    return findByIdWithAnswers(id, userCondition);
  }
  
  public FormResponse findByIdWithAnswers(Long Id, BooleanExpression userCondition) {

    FormResponse response = queryFactory.selectFrom(formResponse)
                .leftJoin(formResponse.user, user).fetchJoin()
                .leftJoin(formResponse.form, form).fetchJoin()                
                .leftJoin(formResponse.formAnswers, formAnswer).fetchJoin()
                .leftJoin(formAnswer.question, question).fetchJoin()                
                .leftJoin(formAnswer.selectedOption, optionItem).fetchJoin()
                .where(                  
                  formResponse.id.eq(Id).and(
                    userCondition
                ))
                .fetchOne();

    if (response == null || response.getForm() == null) {
      return null;
    }                

    List<Question> questions = queryFactory.selectFrom(question)
                                           .leftJoin(question.questionType, code).fetchJoin()
                                           .where(question.form.id.eq(response.getForm().getId()))
                                           .fetch();                                        

    questions.forEach(q -> {
        q.getOptionList().size();
    });            
    
    response.getForm().setQuestions(questions);   

    return response;                
  }  

  private List<BooleanExpression> buildWhereConditions(FormResponseSearchReq searchReq,
                                                        BooleanExpression userCondition,
                                                        List<BooleanExpression> extraConditions) {
      List<BooleanExpression> conditions = new ArrayList<>();
      conditions.add(titleLike(searchReq));
      conditions.add(hasRespondedEq(searchReq, userCondition));
      conditions.add(hasExpired());
      conditions.addAll(extraConditions);
      return conditions;
  }  

  private Expression<Long> fetchFormResponseId(BooleanExpression userCondition) {
    if (userCondition == null) {
      return Expressions.nullExpression(Long.class);
    }
      return JPAExpressions.select(formResponse.id)
                                        .from(formResponse)
                                        .where(
                                          formResponse.form.id.eq(form.id),
                                            userCondition
                                        );  
  }

  private BooleanExpression hasExpired() {
    return form.expiresAt
               .after(LocalDate.now().minusDays(1))
               .or(form.expiresAt.isNull());
  }

  private BooleanExpression titleLike(FormResponseSearchReq searchReq) {
    String searchKeyword = searchReq == null  ? 
                               null : searchReq.getSearchKeyword();
    return (searchKeyword == null || searchKeyword.isBlank()) 
             ? null 
             : form.title.like("%" + searchKeyword + "%");                               
  }

  private BooleanExpression hasRespondedEq(FormResponseSearchReq searchReq, BooleanExpression userCondition) {
    Boolean hasResponded = searchReq == null ? 
                             null : searchReq.getHasResponded();
    if (hasResponded == null || userCondition == null) {
      return null;
    }                             
    BooleanExpression existExpr =  JPAExpressions.selectOne()
                                        .from(formResponse)
                                        .where(
                                          formResponse.form.id.eq(form.id),
                                          userCondition
                                        )
                                        .exists();

    return hasResponded ? existExpr : existExpr.not();                                        

  }

  private BooleanExpression eqRequiresLogin() {
    return form.requiresLogin.isFalse();
  }

  private BooleanExpression eqIsPublic() {
    return form.isPublic.isTrue();
  }

  

  
}
