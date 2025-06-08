package com.toy.survey.enums;

import lombok.Getter;

@Getter
public enum UserRoleType {

  ROLE_USER("ROLE_USER"),

  ROLE_ADMIN("ROLE_ADMIN");

  private String roleName;

  private UserRoleType(String roleName) {
    this.roleName = roleName;
  }
  
}
