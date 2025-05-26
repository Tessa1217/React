package com.toy.survey.controller.survey;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.service.surveyForm.SurveyFormService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST})
@RequestMapping("/survey/form")
@RequiredArgsConstructor
@RestController
public class SurveyFormController {

  private final SurveyFormService surveyFormService;

  @GetMapping("/list")
  public ResponseEntity<?> getSurveyList(@PageableDefault(page = 0, size = 10) Pageable pageable) {    
    return ResponseEntity.ok().body(surveyFormService.getSurveyFormList(pageable));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getSurvey(@PathVariable Long id) {
    return ResponseEntity.ok().body(surveyFormService.getSurveyForm(id));
  }

  @PostMapping("/ins")
  public ResponseEntity<?> insSurvey(@RequestBody FormReq formRequest) {
    surveyFormService.saveSurvey(formRequest);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/upd")
  public ResponseEntity<?> updSurvey(@RequestBody FormReq formRequest) {
    surveyFormService.updateSurvey(formRequest);
    return ResponseEntity.ok().build();
  }
    
  
}
