package com.toy.survey.repository.surveyResponse;

import static com.querydsl.core.types.ExpressionUtils.as;
import static com.querydsl.core.types.Projections.constructor;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.toy.survey.domain.survey.QForm;
import com.toy.survey.domain.survey.QFormResponse;
import com.toy.survey.dto.surveyResponse.ResponseFormRes;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SurveyResponseQueryDSLRepository {

  private final JPAQueryFactory queryFactory;

  private QForm form = QForm.form;

  private QFormResponse formResponse = QFormResponse.formResponse;

  @Transactional(readOnly = true)
  public Page<ResponseFormRes> findAllWithResponsed(Pageable pageable, Long userId) {

    BooleanExpression hasResponded = JPAExpressions.selectOne()
                                                         .from(formResponse)
                                                         .where(
                                                          formResponse.form.id.eq(form.id)
                                                          .and(formResponse.user.id.eq(userId))
                                                         )
                                                         .exists();

    Expression<Boolean> responded = new CaseBuilder().when(hasResponded)
                                                     .then(true)
                                                     .otherwise(false);                                                         

    List<ResponseFormRes> responseList = queryFactory
                                           .select(constructor(ResponseFormRes.class,
                                              form.id,
                                              form.title,
                                              form.description,
                                              form.isPublic,
                                              form.requiresLogin,
                                              form.expiresAt,                                              
                                              as(responded,"responsed")
                                            ))
                                          .from(form)
                                          .offset(pageable.getOffset())
                                          .limit(pageable.getPageSize())
                                          .fetch();

    long total = queryFactory
        .select(form.count())
        .from(form)
        .fetchOne();

    return new PageImpl<>(responseList, pageable, total);       

  }

  
}
