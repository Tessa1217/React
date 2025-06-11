package com.toy.survey.dto.surveyForm;

import java.util.List;

import org.springframework.data.domain.Page;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Schema(description = "페이징 응답 DTO")
public class PageRes<T> {

  @Schema(description = "현재 페이지 번호 (0부터 시작)", example = "0")
  private int currentPage;

  @Schema(description = "전체 페이지 수", example = "5")
  private int totalPages;

  @Schema(description = "전체 항목 수", example = "100")
  private long totalItems;

  @Schema(description = "페이지당 항목 수", example = "10")
  private int limit;

  @Schema(description = "페이지 내 포함된 데이터 리스트")
  private List<T> items;

  @Schema(description = "검색 조건 정보 (요청시 사용한 검색 파라미터 그대로)")
  private Object search;

  public static <T> PageRes<T> fromPage(Page<T> page) {
    return PageRes.<T>builder()
                  .currentPage(page.getNumber())
                  .totalPages(page.getTotalPages())
                  .totalItems(page.getTotalElements())
                  .limit(page.getSize())
                  .items(page.getContent())
                  .build();
  }

  public static <T> PageRes<T> fromPage(Page<T> page, Object search) {
    return PageRes.<T>builder()
                  .currentPage(page.getNumber())
                  .totalPages(page.getTotalPages())
                  .totalItems(page.getTotalElements())
                  .limit(page.getSize())
                  .items(page.getContent())
                  .search(search)
                  .build();
  }

}
