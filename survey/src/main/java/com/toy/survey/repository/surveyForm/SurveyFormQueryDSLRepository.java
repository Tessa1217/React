package com.toy.survey.repository.surveyForm;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.toy.survey.domain.code.QCode;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.QForm;
import com.toy.survey.domain.survey.QOptionItem;
import com.toy.survey.domain.survey.QQuestion;
import com.toy.survey.domain.survey.Question;
import com.toy.survey.domain.user.QUser;
import com.toy.survey.dto.surveyForm.FormSearchReq;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SurveyFormQueryDSLRepository {

  private final JPAQueryFactory queryFactory;

  private static final QForm form = QForm.form;

  private static final QUser user = QUser.user;

  private static final QQuestion question = QQuestion.question;

  private static final QOptionItem optionItem = QOptionItem.optionItem;

  private static final QCode code = QCode.code1;

  @Transactional(readOnly = true)
  public Page<Form> findAllWithSearchCondition(Pageable pageable, 
                                               Long userId, 
                                               FormSearchReq searchReq) {

    JPAQuery<Form> baseQuery = queryFactory.selectFrom(form)     
                                     .where( 
                                        form.user.id.eq(userId),
                                        isPublicEq(searchReq),
                                        titleLike(searchReq)
                                     );                                                    

    long total = baseQuery.clone().select(form.count()).fetchOne();

    if (total == 0) {
      return Page.empty(pageable);
    }

    List<Form> forms = baseQuery.offset(pageable.getOffset())
                                .limit(pageable.getPageSize())
                                .orderBy(form.createdAt.desc())
                                .fetch();

    return new PageImpl<>(forms, pageable, total);
    
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
    
    // MultipleBagFetchException으로 인해서 분리해서 조회 
    
    List<Question> questions = formWithQuestions.getQuestionList();
     
    if (!questions.isEmpty()) {
     List<OptionItem> options = queryFactory.selectFrom(optionItem)                  
                  .leftJoin(optionItem.question, question).fetchJoin()
                  .where(optionItem.question.in(questions))
                  .fetch();  // OptionItem을 별도 쿼리로 한번에 로딩

      questions.forEach(q -> {
        List<OptionItem> matched = options.stream()
                                          .filter(opt -> opt.getQuestion().equals(q))
                                          .collect(Collectors.toList());
          q.setOptions(matched);
      });                        
    }    

    return Optional.of(formWithQuestions);

  }
  
}
