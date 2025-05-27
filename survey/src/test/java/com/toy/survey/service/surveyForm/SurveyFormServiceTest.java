package com.toy.survey.service.surveyForm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.toy.survey.service.surveyForm.SurveyFormService;

@SpringBootTest
public class SurveyFormServiceTest {

  @Autowired
  SurveyFormService surveyFormService;

  @Test
  public void updateTest() {

    // FormReq formRequest = FormReq.builder().id(25L)
    //                              .description("설문지 테스트 진행")
    //                              .isPublic(false)
    //                              .expiresAt(LocalDateTime.now())
    //                              .build();
    // surveyFormService.updateSurvey(formRequest);

  }

  
}
