package com.toy.survey.repository.surveyResponse;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.toy.survey.dto.surveyResponse.ResponseFormRes;

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

      Page<ResponseFormRes> page = surveyResponseQueryDSLRepository.findAllWithResponsed(pageable, userId);

      List<ResponseFormRes> content = page.getContent();

      // 현재 데이터 있음
      assertThat(content).isNotEmpty();

      // 현재 응시한 사람 없음
      assertThat(content.get(0).getResponsed()).isFalse();
  }  

  
}
