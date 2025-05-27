package com.toy.survey.service.user;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationAware implements AuditorAware<String> {

  @Override
  public Optional<String> getCurrentAuditor() {
    return Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
                .map(principal -> {
                  if (principal instanceof String) {
                    return (String) principal;
                  }
                  return null;
                });                
  }
  
}
