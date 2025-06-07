package com.toy.survey.service.user;

import java.util.Optional;

import com.toy.survey.dto.user.LoginUserReq;
import com.toy.survey.dto.user.SignUpUserReq;

public interface UserService {
  
  String login(LoginUserReq req);

  boolean checkDuplicateUserId(String userId);

  boolean checkDuplicateEmail(String email);

  void signUp(SignUpUserReq req);

  Optional<Long> getCurrentUserId();

  Optional<String> getAnonymousId();
  
}
