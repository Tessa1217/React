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

import com.toy.survey.dto.surveyResponse.FormResponseReq;
import com.toy.survey.dto.surveyResponse.FormResponseSearchReq;
import com.toy.survey.service.surveyResponse.SurveyResponseService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/survey/response")
@RequiredArgsConstructor
@RestController
public class SurveyResponseController {

  private final SurveyResponseService surveyResponseService;

  /**
   * 참여 설문 목록 조회
   *
   * @param pageable 페이지 정보 (사이즈, 페이지 번호 등)
   * @param searchReq 검색 요청 정보 (설문 제목, 응답 여부)   
   * @return ResponseEntity 응답 객체
   */    
  @GetMapping("/list")
  public ResponseEntity<?> getSurveyResponseList(@PageableDefault(page = 0, size = 10) Pageable pageable,
                                                 FormResponseSearchReq searchReq) {                                                                                              
    return ResponseEntity.ok().body(surveyResponseService.getSurveyResponseList(pageable, searchReq));
  }

  /**
   * 참여 설문 상세 조회
   * - 참여한 설문에 대하여 상세 조회
   *
   * @param pageable 페이지 정보 (사이즈, 페이지 번호 등)
   * @param searchReq 검색 요청 정보 (설문 제목, 응답 여부)   
   * @return ResponseEntity 응답 객체
   */    
  @GetMapping("/{id}")
  public ResponseEntity<?> getSurveyResponse(@PathVariable Long id) {
    return ResponseEntity.ok().body(surveyResponseService.getSurveyResponse(id));
  }

  @PostMapping("/ins")
  public ResponseEntity<?> insSurveyResponse(@RequestBody FormResponseReq formResponse) {                                                  
    return ResponseEntity.ok().body(surveyResponseService.insSurveyResponse(formResponse));
  }

  @PostMapping("/upd")
  public ResponseEntity<?> updSurveyResponse() {
    return ResponseEntity.ok().build();
  }
  
}
