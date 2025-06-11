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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
  @Operation(
    summary = "참여 설문 목록 조회",
    description = "응답 여부, 제목 등 조건에 따라 참여 가능한 설문 목록을 페이징 처리하여 조회합니다.",
    responses = @ApiResponse(responseCode = "200", description = "조회 성공")
  )  
  public ResponseEntity<?> getSurveyResponseList(@PageableDefault(page = 0, size = 10) Pageable pageable,
                                                 FormResponseSearchReq searchReq) {                                                                                              
    return ResponseEntity.ok().body(surveyResponseService.getSurveyResponseList(pageable, searchReq));
  }

  /**
   * 참여 설문 상세 조회
   * - 참여할 설문에 대한 상세 조회
   *
   * @param pageable 페이지 정보 (사이즈, 페이지 번호 등)
   * @param searchReq 검색 요청 정보 (설문 제목, 응답 여부)   
   * @return ResponseEntity 응답 객체
   */    
  @GetMapping("/take/{id}")
  @Operation(
    summary = "응답할 설문 상세 조회",
    description = "설문 응답을 위한 설문 상세 정보를 조회합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "조회 성공"),
      @ApiResponse(responseCode = "404", description = "존재하지 않는 설문 ID", content = @Content)
    }
  )  
  public ResponseEntity<?> getSurveyTakeForm(@PathVariable 
                                             @Parameter(description = "설문 ID", example = "1") Long id) {
    return ResponseEntity.ok().body(surveyResponseService.getSurveyTakeForm(id));
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
  @Operation(
    summary = "응답한 설문 상세 조회",
    description = "응답 완료된 설문에 대한 상세 정보를 조회합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "조회 성공"),
      @ApiResponse(responseCode = "404", description = "응답 결과 없음", content = @Content)
    }
  )  
  public ResponseEntity<?> getSurveyResponse(@PathVariable 
                                             @Parameter(description = "참여한 설문 ID", example = "1") Long id) {
    return ResponseEntity.ok().body(surveyResponseService.getSurveyResponse(id));
  }

  /**
   * 설문 응답 등록
   * - 참여한 설문에 대한 응답 등록
   *
   * @param formResponse 설문 응답 정보   
   * @return ResponseEntity 응답 객체
   */     
  @PostMapping("/ins")
  @Operation(
    summary = "설문 응답 등록",
    description = "설문 응답을 저장합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "저장 성공"),
      @ApiResponse(responseCode = "400", description = "입력 오류", content = @Content)
    }
  )  
  public ResponseEntity<?> insSurveyResponse(@RequestBody @Schema(implementation = FormResponseReq.class) FormResponseReq formResponse) {                                                  
    return ResponseEntity.ok().body(surveyResponseService.insSurveyResponse(formResponse));
  }
  
}
