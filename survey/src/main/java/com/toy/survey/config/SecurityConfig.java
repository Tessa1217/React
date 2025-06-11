package com.toy.survey.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.toy.survey.filter.AnonymousUserAuthenticationFilter;
import com.toy.survey.filter.JwtAuthenticationFilter;
import com.toy.survey.service.user.CustomUserDetailService;
import com.toy.survey.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
  
  private final JwtUtil jwtUtil;

  private final CustomUserDetailService customUserDetailService;

  private final String[] swaggerPaths = {
          "/v3/api-docs/**",
          "/swagger-ui/**",
          "/swagger-ui.html",
          "/api-docs/**", // ← springdoc.yml 에 설정한 커스텀 경로
          "/api-info.html"    
  };

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
        .cors(Customizer.withDefaults())
        .formLogin(AbstractHttpConfigurer::disable)
        .anonymous(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(
          (authorize) -> authorize
                            .requestMatchers(swaggerPaths)
                            .permitAll()
                            .requestMatchers("/user/**")
                            .permitAll()                            
                            .requestMatchers("/survey/response/**")
                            .hasAnyAuthority("ROLE_ADMIN", "ROLE_ANONYMOUS", "ROLE_USER")
                            .anyRequest()
                            .authenticated()                              
        )
        .logout((logout) -> logout.logoutSuccessUrl("/login"))        
        .addFilterBefore(new AnonymousUserAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(new JwtAuthenticationFilter(jwtUtil, customUserDetailService), UsernamePasswordAuthenticationFilter.class);
        

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setAllowCredentials(true); // 토큰 포함 허용

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
