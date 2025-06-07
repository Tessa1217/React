package com.toy.survey.config;

import org.springframework.core.MethodParameter;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.toy.survey.annotation.CurrentUser;

public class CurrentUserArgumentResolver implements HandlerMethodArgumentResolver {

  @Override
  public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(CurrentUser.class) != null &&
               parameter.getParameterType().equals(CustomUserPrincipal.class);
  }

  @Override
  @Nullable
  public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,
      NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {
    
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof CustomUserPrincipal) {
        return (CustomUserPrincipal) authentication.getPrincipal();
    }
    return null;    

  }

  
}
