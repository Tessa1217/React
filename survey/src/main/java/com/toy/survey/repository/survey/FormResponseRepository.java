package com.toy.survey.repository.survey;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.survey.domain.survey.FormResponse;

public interface FormResponseRepository extends JpaRepository<FormResponse, Long> {

  Optional<FormResponse> findByFormIdAndUserId(Long formId, Long userId);

  Optional<FormResponse> findByFormIdAndAnonymousId(Long formId, String anonymousId);
  
}
