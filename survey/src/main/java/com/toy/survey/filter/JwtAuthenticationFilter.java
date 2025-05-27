package com.toy.survey.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.toy.survey.config.CustomUserPrincipal;
import com.toy.survey.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  public JwtAuthenticationFilter(JwtUtil jwtUtil) {
    this.jwtUtil = jwtUtil;
  }

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                  @NonNull HttpServletResponse response, 
                                  @NonNull FilterChain filterChain) 
    throws ServletException, IOException {
      String token = jwtUtil.resolveAccessToken(request);
      if (StringUtils.hasText(token) && jwtUtil.validateToken(token)) {
        Long id = jwtUtil.getId(token);
        String userId = jwtUtil.getUserId(token);

        CustomUserPrincipal principal = CustomUserPrincipal
                                           .builder()
                                           .id(id)
                                           .userId(userId)
                                           .build();

        UsernamePasswordAuthenticationToken auth = 
          new UsernamePasswordAuthenticationToken(principal, null, List.of());
          
        SecurityContextHolder.getContext().setAuthentication(auth);
      }

      filterChain.doFilter(request, response);
  }
      
  
  
}
