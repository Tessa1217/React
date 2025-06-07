package com.toy.survey.service.user;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.toy.survey.domain.user.User;
import com.toy.survey.exception.UnauthorizedException;
import com.toy.survey.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserContextService {

    private final UserService userService;

    private final UserRepository userRepository;

    public Long getCurrentUserIdOrThrow() {
      Long userId = userService.getCurrentUserId()
          .orElseThrow(() -> new UnauthorizedException("로그인한 사용자만 접근 가능합니다."));      
      return userId;
    }

    public User getCurrentUserOrThrow() {
      Long userId = getCurrentUserIdOrThrow();
      return userRepository.findById(userId)
              .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다."));
    }  

    public String getCurrentAnonymousUserOrThrow() {
      String anonymousId = userService.getAnonymousId()
                            .orElseThrow(() -> new UnauthorizedException("로그인한 사용자만 접근 가능합니다."));

      return anonymousId;                            
    }

  
}
