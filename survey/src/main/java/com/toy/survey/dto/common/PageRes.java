package com.toy.survey.dto.common;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageRes<T> {

  private int currentPage;

  private int totalPages;

  private long totalItems;

  private int limit;

  private List<T> items;

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
