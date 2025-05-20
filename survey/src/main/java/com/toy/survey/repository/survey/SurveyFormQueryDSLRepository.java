package com.toy.survey.repository.survey;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.toy.survey.domain.survey.Form;
import com.toy.survey.domain.survey.OptionItem;
import com.toy.survey.domain.survey.QForm;
import com.toy.survey.domain.survey.QOptionItem;
import com.toy.survey.domain.survey.QQuestion;
import com.toy.survey.domain.survey.Question;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SurveyFormQueryDSLRepository {

  private final JPAQueryFactory queryFactory;

  public Page<Form> findAllWithQuestionsAndOptions(Pageable pageable) {
        
    QForm form = QForm.form;
    QQuestion question = QQuestion.question;
    QOptionItem optionItem = QOptionItem.optionItem;

    // 기본 Form 조회
    List<Form> forms = queryFactory.select(form)
    .from(form)
    .leftJoin(form.questionList, question).fetchJoin()  // questionList를 eager fetch
    .offset(pageable.getOffset())
    .limit(pageable.getPageSize())
    .fetch();

    // Question 목록 추출
    List<Question> questions = forms.stream()
        .flatMap(f -> f.getQuestionList().stream())
        .collect(Collectors.toList());

    // OptionItem 목록을 별도 조회
    List<OptionItem> optionItems = queryFactory.selectFrom(optionItem)
        .where(optionItem.question.in(questions))
        .fetch();

    // OptionItem을 각 Question에 수동으로 설정
    questions.forEach(q -> {
      List<OptionItem> options = optionItems.stream()
              .filter(option -> option.getQuestion().getId().equals(q.getId()))
              .collect(Collectors.toList());
      q.addOptions(options);
    });          

    // 전체 count 쿼리
    long total = queryFactory.select(form.count())
            .from(form)
            .fetchOne();

    return new PageImpl<>(forms, pageable, total);    
  }
  
}
