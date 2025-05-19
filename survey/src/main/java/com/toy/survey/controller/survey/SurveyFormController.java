package com.toy.survey.controller.survey;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequestMapping("/survey/form")
@RequiredArgsConstructor
@RestController
public class SurveyFormController {

  @GetMapping("/list")
  public ResponseEntity<?> getSurveyList() {
    return ResponseEntity.ok().body(null);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getSurvey(@PathVariable Long id) {
    return ResponseEntity.ok().body(null);
  }

  @PostMapping("/ins")
  public ResponseEntity<?> insSurvey() {
    return ResponseEntity.ok().build();
  }

  @PostMapping("/upd")
  public ResponseEntity<?> updSurvey() {
    return ResponseEntity.ok().build();
  }
    
  
}
