package com.toy.survey.repository.surveyForm;

import static com.querydsl.core.types.ExpressionUtils.as;
import static com.querydsl.core.types.Projections.constructor;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.toy.survey.domain.code.QCode;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.QForm;
import com.toy.survey.domain.survey.QFormResponse;
import com.toy.survey.domain.survey.QQuestion;
import com.toy.survey.domain.user.QUser;
import com.toy.survey.dto.surveyForm.FormRes;
import com.toy.survey.dto.surveyForm.FormSearchReq;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SurveyFormQueryDSLRepository {

  private final JPAQueryFactory queryFactory;

  private static final QForm form = QForm.form;

  private static final QUser user = QUser.user;

  private static final QQuestion question = QQuestion.question;

  private static final QCode code = QCode.code1;

  private static final QFormResponse formResponse = QFormResponse.formResponse;

  @Transactional(readOnly = true)
  public Page<FormRes> findAllWithSearchCondition(Pageable pageable, 
                                               Long userId, 
                                               FormSearchReq searchReq) {

    JPAQuery<FormRes> baseQuery = queryFactory
        .select(constructor(FormRes.class,
            form.id,
            form.title,
            form.description,
            form.isPublic,
            form.requiresLogin,
            form.expiresAt,            
            as(hasResponse(), "hasResponse")
        ))
        .from(form)
        .where(
            form.user.id.eq(userId),            
            isPublicEq(searchReq),
            titleLike(searchReq)
        );                                                

    long total = baseQuery.clone().select(form.count()).fetchOne();

    if (total == 0) {
      return Page.empty(pageable);
    }

    List<FormRes> forms = baseQuery.offset(pageable.getOffset())
                                .limit(pageable.getPageSize())
                                .orderBy(form.createdAt.desc())
                                .fetch();

    return new PageImpl<>(forms, pageable, total);
    
  }

  private BooleanExpression hasResponse() {
    return JPAExpressions.selectOne()
                         .from(formResponse)
                         .where(
                          formResponse.form.id.eq(form.id)
                         )
                         .exists();                         
  }

  private BooleanExpression titleLike(FormSearchReq searchReq) {
    String keyword = searchReq != null ? searchReq.getSearchKeyword() : null;
    return (keyword == null || keyword.isBlank()) ? null : form.title.like("%" + keyword + "%");    
  }

  private BooleanExpression isPublicEq(FormSearchReq searchReq) {
    if (searchReq == null || searchReq.getSearchFilter() == null) return null;

    String filter = searchReq.getSearchFilter().toLowerCase();

    if ("all".equals(filter)) return null;
    if ("public".equals(filter)) return form.isPublic.isTrue();
    if ("private".equals(filter)) return form.isPublic.isFalse();

    return null; 
  }
    
  @Transactional(readOnly = true)
  public Optional<Form> findByIdWithQuestions(Long id) {

    Form formWithQuestions = queryFactory
      .selectFrom(form)
      .leftJoin(form.user, user).fetchJoin()
      .leftJoin(form.questionList, question).fetchJoin()
      .leftJoin(question.questionType, code).fetchJoin()
      .where(form.id.eq(id))
      .fetchOne();

    if (formWithQuestions == null) {
      return Optional.empty();
    }
    
    // MultipleBagFetchException으로 인해서 분리해서 초기화
    // Batch Size 활용
    
    formWithQuestions.getQuestionList().forEach(q -> {
      q.getOptionList().size(); // 초기화 트리거 (Batch Fetch)
    });    

    return Optional.of(formWithQuestions);

  }
  
}
