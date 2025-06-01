package com.toy.survey.config;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.toy.survey.domain.user.User;

public class CustomUserPrincipal implements UserDetails {

  private final User user;

  public CustomUserPrincipal (User user) {
    this.user = user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return user.getRoles().stream()
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .collect(Collectors.toSet());
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  @Override
  public String getUsername() {
    return user.getUserId();
  }

  public String getUserId() {
    return user.getUserId();
  }

  public Long getId() {
    return user.getId();
  }
  
}
