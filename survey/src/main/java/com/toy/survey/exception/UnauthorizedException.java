package com.toy.survey.exception;

public class UnauthorizedException extends RuntimeException{ 

  public UnauthorizedException(String message) {
    super(message);
  }
  
}
