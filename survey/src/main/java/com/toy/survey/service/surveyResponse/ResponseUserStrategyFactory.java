package com.toy.survey.service.surveyResponse;

import org.springframework.stereotype.Component;

import com.toy.survey.exception.UnauthorizedException;
import com.toy.survey.repository.survey.FormResponseRepository;
import com.toy.survey.repository.surveyResponse.SurveyResponseQueryDSLRepository;
import com.toy.survey.repository.user.UserRepository;
import com.toy.survey.service.user.UserService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ResponseUserStrategyFactory {

  private final UserService userService;

  private final UserRepository userRepository;

  private final FormResponseRepository formResponseRepository;

  private final SurveyResponseQueryDSLRepository surveyResponseQueryDSLRepository;

  public ResponseUserStrategy resolve() {
    return userService.getCurrentUserId()
                  .<ResponseUserStrategy> map(userId -> 
                    new AuthenticatedUserStrategy(userId, userRepository, 
                                                  formResponseRepository,
                                                  surveyResponseQueryDSLRepository)
                  )
                  .orElseGet(() -> {
                    String anonymousId = userService.getAnonymousId()
                                             .orElseThrow(() -> new UnauthorizedException("인증된 사용자만 이용할 수 있습니다."));
                    return new AnonymousUserStrategy(anonymousId, 
                                                     formResponseRepository,
                                                     surveyResponseQueryDSLRepository);                                             
                  });
  }
  
}
