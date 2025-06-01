package com.toy.survey.filter;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.toy.survey.config.CustomUserPrincipal;
import com.toy.survey.service.user.CustomUserDetailService;
import com.toy.survey.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  private final CustomUserDetailService customUserDetailService;

  public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailService customUserDetailService) {
    this.jwtUtil = jwtUtil;
    this.customUserDetailService = customUserDetailService;
  }

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                  @NonNull HttpServletResponse response, 
                                  @NonNull FilterChain filterChain) 
    throws ServletException, IOException {
      String token = jwtUtil.resolveAccessToken(request);
      if (StringUtils.hasText(token) && jwtUtil.validateToken(token)) {

        String userId = jwtUtil.getUserId(token);

        CustomUserPrincipal principal = customUserDetailService.loadUserByUsername(userId);

        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

      }

      filterChain.doFilter(request, response);
  }
      
  
  
}
