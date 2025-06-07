package com.toy.survey.filter;

import java.io.IOException;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AnonymousUserAuthenticationFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    // 인증받지 않은 상태라면
    if (auth == null || !auth.isAuthenticated()) {
      String annonymousId = request.getHeader("X-Anonymous-Id");
      if (annonymousId != null && !"".equals(annonymousId)) {
        Authentication annonymousAuth = 
             new AnonymousAuthenticationToken(
                         "annonymousKey", 
                         annonymousId, 
                         AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS")
                                             );
        SecurityContextHolder.getContext().setAuthentication(annonymousAuth);                                             
      }
    }

    filterChain.doFilter(request, response);
  }
  
}
