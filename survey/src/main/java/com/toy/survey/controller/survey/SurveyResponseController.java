package com.toy.survey.controller.survey;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequestMapping("/survey/response")
@RequiredArgsConstructor
@RestController
public class SurveyResponseController {

  @GetMapping("/list")
  public ResponseEntity<?> getSurveyMngList() {
    return ResponseEntity.ok().body(null);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getSurveyMng(@PathVariable Long id) {
    return ResponseEntity.ok().body(null);
  }

  @PostMapping("/ins")
  public ResponseEntity<?> insSurveyMng() {
    return ResponseEntity.ok().build();
  }

  @PostMapping("/upd")
  public ResponseEntity<?> updSurveyMng() {
    return ResponseEntity.ok().build();
  }
  
}
