package com.toy.survey.service.user;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.toy.survey.config.CustomUserPrincipal;

@Component
public class AuthenticationAware implements AuditorAware<String> {

  @Override
  public Optional<String> getCurrentAuditor() {
    return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
            .map(principal -> {
                if (principal instanceof CustomUserPrincipal customUser) {
                    return customUser.getUserId();
                } else if (principal instanceof String s && !"anonymousUser".equals(s)) {
                    return s; // JWT 인증 등에서 문자열 principal일 수도 있음
                }
                return "SYSTEM"; // fallback
            });             
  }
  
}
