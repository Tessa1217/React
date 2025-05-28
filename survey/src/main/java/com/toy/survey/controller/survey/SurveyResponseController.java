package com.toy.survey.controller.survey;

import java.security.Principal;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.survey.config.CurrentUser;
import com.toy.survey.config.CustomUserPrincipal;
import com.toy.survey.service.surveyResponse.SurveyResponseService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/survey/response")
@RequiredArgsConstructor
@RestController
public class SurveyResponseController {

  private final SurveyResponseService surveyResponseService;

  @GetMapping("/list")
  public ResponseEntity<?> getSurveyResponseList(@PageableDefault(page = 0, size = 10) Pageable pageable,
                                                 @CurrentUser CustomUserPrincipal principal) {                                                                                              
    return ResponseEntity.ok().body(surveyResponseService.getSurveyResponseList(pageable, principal));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getSurveyResponse(@PathVariable Long id) {
    return ResponseEntity.ok().body(null);
  }

  @PostMapping("/ins")
  public ResponseEntity<?> insSurveyResponse() {
    return ResponseEntity.ok().build();
  }

  @PostMapping("/upd")
  public ResponseEntity<?> updSurveyResponse() {
    return ResponseEntity.ok().build();
  }
  
}
