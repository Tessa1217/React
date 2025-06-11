package com.toy.survey.controller.survey;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.survey.dto.surveyForm.FormReq;
import com.toy.survey.dto.surveyForm.FormSearchReq;
import com.toy.survey.service.surveyForm.SurveyFormService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "SurveyForm-Controller", description = "설문지 관리 API")
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
  @Operation(
    summary = "설문지 목록 조회",
    description = "조건에 맞는 설문지 목록을 페이지 형태로 조회합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "조회 성공")
    }
  )  
  public ResponseEntity<?> getSurveyList(@PageableDefault(page = 0, size = 10) Pageable pageable,
                                         FormSearchReq searchReq) {                                          
    return ResponseEntity.ok().body(surveyFormService.getSurveyFormList(pageable, searchReq));
  }

  /**
   * 설문지 상세조회
   *
   * @param id 설문지 ID
   * @return ResponseEntity<?> 설문지 상세조회 정보가 담긴 응답 객체 반환
   */    
  @GetMapping("/{id}")
  @Operation(
    summary = "설문지 상세 조회",
    description = "설문지 ID를 기반으로 상세 정보를 조회합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "조회 성공"),
      @ApiResponse(responseCode = "404", description = "존재하지 않는 설문지 ID", content = @Content)
    }
  )  
  public ResponseEntity<?> getSurvey(@PathVariable @Parameter(description = "조회할 설문지 ID", example = "1")  Long id) {
    return ResponseEntity.ok().body(surveyFormService.getSurveyForm(id));
  }

  /**
   * 설문지 등록
   *
   * @param formRequest 등록할 설문지 정보가 담긴 폼 요청
   * @return ResponseEntity<?> 응답 객체
   */    
  @PostMapping("/ins")
  @Operation(
    summary = "설문지 등록",
    description = "새로운 설문지를 등록합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "등록 성공"),
      @ApiResponse(responseCode = "400", description = "입력값 오류", content = @Content)
    }
  )  
  public ResponseEntity<?> insSurvey(@Valid @RequestBody @Schema(implementation = FormReq.class) FormReq formRequest) {
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
  @Operation(
    summary = "설문지 수정",
    description = "기존 설문지를 수정합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "수정 성공"),
      @ApiResponse(responseCode = "400", description = "입력값 오류", content = @Content)
    }
  )  
  public ResponseEntity<?> updSurvey(@Valid @RequestBody @Schema(implementation = FormReq.class) FormReq formRequest) {
    surveyFormService.updateSurvey(formRequest);
    return ResponseEntity.ok().build();
  }

  /**
   * 설문지 삭제
   *
   * @param formIds 삭제할 설문지 ID가 담긴 리스트
   * @return ResponseEntity<?> 응답 객체
   */    
  @PostMapping("/del")
  @Operation(
    summary = "설문지 삭제",
    description = "여러 개의 설문지를 한 번에 삭제합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "삭제 성공"),
      @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content)
    }
  )  
  public ResponseEntity<?> delSurvey(@RequestBody 
                                     @Parameter(description = "삭제할 설문지 ID 목록", example = "[1, 2, 3]") 
                                     List<Long> formIds) {
    surveyFormService.deleteSurvey(formIds);
    return ResponseEntity.ok().build();
  } 
    
  
}
