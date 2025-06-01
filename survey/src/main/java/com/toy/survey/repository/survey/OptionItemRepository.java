package com.toy.survey.repository.survey;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.survey.OptionItem;

public interface OptionItemRepository extends JpaRepository<OptionItem, Long> {
  
}
