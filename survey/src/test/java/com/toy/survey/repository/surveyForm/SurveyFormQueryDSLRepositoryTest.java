package com.toy.survey.repository.surveyForm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SurveyFormQueryDSLRepositoryTest {

  @Autowired
  private SurveyFormQueryDSLRepository surveyFormQueryDSLRepository;

  @Test
  void findByIdWithQuestions() {
    Long formId = 5L;
    surveyFormQueryDSLRepository.findByIdWithQuestions(formId);
  }
  
}
