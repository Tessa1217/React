package com.toy.survey.service.user;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.toy.survey.config.CustomUserPrincipal;
import com.toy.survey.domain.user.User;
import com.toy.survey.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

  private final UserRepository userRepository;
  
  @Override
  public CustomUserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUserId(username)
        .orElseThrow(() -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다."));
    return new CustomUserPrincipal(user);  
  }
  
}
