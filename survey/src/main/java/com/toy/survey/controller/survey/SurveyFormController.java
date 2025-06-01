package com.toy.survey.controller.survey;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.survey.config.CurrentUser;
import com.toy.survey.config.CustomUserPrincipal;
import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.service.surveyForm.SurveyFormService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/survey/form")
@RequiredArgsConstructor
@RestController
public class SurveyFormController {

  private final SurveyFormService surveyFormService;

  /**
   * 설문지 목록 조회
   *
   * @param pageable 페이징 정보 객체
   * @return ResponseEntity<?> 설문지 목록 정보가 담긴 응답 객체 반환
   */
  @GetMapping("/list")
  public ResponseEntity<?> getSurveyList(@PageableDefault(page = 0, size = 10) Pageable pageable) {    
    return ResponseEntity.ok().body(surveyFormService.getSurveyFormList(pageable));
  }

  /**
   * 설문지 상세조회
   *
   * @param id 설문지 ID
   * @return ResponseEntity<?> 설문지 상세조회 정보가 담긴 응답 객체 반환
   */    
  @GetMapping("/{id}")
  public ResponseEntity<?> getSurvey(@PathVariable Long id) {
    return ResponseEntity.ok().body(surveyFormService.getSurveyForm(id));
  }

  /**
   * 설문지 등록
   *
   * @param formRequest 등록할 설문지 정보가 담긴 폼 요청
   * @return ResponseEntity<?> 응답 객체
   */    
  @PostMapping("/ins")
  public ResponseEntity<?> insSurvey(@RequestBody FormReq formRequest) {
    surveyFormService.saveSurvey(formRequest);
    return ResponseEntity.ok().build();
  }

  /**
   * 설문지 수정
   *
   * @param formRequest 등록할 설문지 정보가 담긴 폼 요청
   * @return ResponseEntity<?> 응답 객체
   */   
  @PostMapping("/upd")
  public ResponseEntity<?> updSurvey(@RequestBody FormReq formRequest) {
    surveyFormService.updateSurvey(formRequest);
    return ResponseEntity.ok().build();
  }
    
  
}
