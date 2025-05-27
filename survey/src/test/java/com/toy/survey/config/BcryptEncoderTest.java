package com.toy.survey.config;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptEncoderTest {
    
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  @Test
  public void passwordEncodeTest() {
    String password = "fusion!@34";
    String encoded = passwordEncoder.encode(password);
    System.out.println(encoded);
    assertTrue(passwordEncoder.matches(password, encoded));
  }
}
