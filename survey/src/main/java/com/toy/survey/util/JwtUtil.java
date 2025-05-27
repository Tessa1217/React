package com.toy.survey.util;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.toy.survey.dto.user.UserRes;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtil {

  private static final String BEARER_TYPE = "Bearer";

  private static final String AUTHORIZATION_HEADER = "Authorization";

  public static final String BEARER_PREFIX = "Bearer ";

  private Key key;
  
  private long accessTokenExpireTime;

  public JwtUtil(@Value("${jwt.secret}") String secretKey, 
                 @Value("${jwt.expiration-time}") long accessTokenExpireTime) {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    this.key = Keys.hmacShaKeyFor(keyBytes);
    this.accessTokenExpireTime = accessTokenExpireTime;
  }

  public String createAccessToken(UserRes user) {
    return createToken(user, accessTokenExpireTime);
  }

  private String createToken(UserRes user, long accessTokenExpireTime) {
      Claims claims = Jwts.claims();
      claims.put("id", user.getId());
      claims.put("userId", user.getUserId());
      claims.put("email", user.getEmail());
      claims.put("name", user.getName());

      ZonedDateTime now = ZonedDateTime.now();
      ZonedDateTime tokenValidity = now.plusSeconds(accessTokenExpireTime);

      return Jwts.builder()
                 .setClaims(claims)
                 .setIssuedAt(Date.from(now.toInstant()))
                 .setExpiration(Date.from(tokenValidity.toInstant()))
                 .signWith(key, SignatureAlgorithm.HS256)
                 .compact();
  }

  public Long getId(String token) {
    return parseClaims(token).get("id", Long.class);
  }

  public String getUserId(String token) {
    return parseClaims(token).get("userId", String.class);
  }

  public boolean validateToken(String token) {
    try {
      parseClaimsJws(token);
      return true;
    } catch (SecurityException | MalformedJwtException e) {
      log.error("Invalid JWT Token", e);
    } catch (ExpiredJwtException e) {
      log.error("Expired JWT", e);
    } catch (UnsupportedJwtException e) {
      log.error("Unsupported JWT", e);
    } catch (IllegalArgumentException e) {
      log.error("Illegal Argument", e);
    }
    return false;
  }

  private Jws<Claims> parseClaimsJws(String token) {
    return Jwts.parserBuilder()
               .setSigningKey(key)
               .build()
               .parseClaimsJws(token);
  }

  private Claims parseClaims(String token) {
    try {

      return parseClaimsJws(token).getBody();

    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }

  public String resolveAccessToken(HttpServletRequest request) {
    String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
      return bearerToken.substring(7);
    }
    return null;
  }

  
  
}
