package com.toy.survey.controller.survey;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.toy.survey.dto.surveyForm.FormRequest;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST})
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
  public ResponseEntity<?> insSurvey(@RequestBody FormRequest formRequest) {
    return ResponseEntity.ok().build();
  }

  @PostMapping("/upd")
  public ResponseEntity<?> updSurvey() {
    return ResponseEntity.ok().build();
  }
    
  
}
