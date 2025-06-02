package com.toy.survey.repository.surveyResponse;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.toy.survey.domain.survey.FormResponse;
import com.toy.survey.dto.surveyResponse.FormResponseRes;
import com.toy.survey.dto.surveyResponse.FormResponseSearchReq;

@SpringBootTest
public class SurveyResponseQueryDSLRepositoryTest {

  @Autowired
  private SurveyResponseQueryDSLRepository surveyResponseQueryDSLRepository;

  private Long userId;

  @BeforeEach
  void setUp() {
    userId = 1L;
  }

  @Test
  void findAllWithResponsed_shouldReturnFormsWithResponseStatus() {
      PageRequest pageable = PageRequest.of(0, 10);

      FormResponseSearchReq searchReq = FormResponseSearchReq.builder().build();

      Page<FormResponseRes> page = surveyResponseQueryDSLRepository.findAllWithResponsed(pageable, userId, searchReq);

      List<FormResponseRes> content = page.getContent();

      // 현재 데이터 있음
      assertThat(content).isNotEmpty();
  }  

  @Test
  void findByIdWithAnswers_shouldReturnWithJoins() {

    Long id = 5L;
    FormResponse response = surveyResponseQueryDSLRepository.findByIdWithAnswers(id, userId);

  }

  
}
