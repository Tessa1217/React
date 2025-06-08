package com.toy.survey.service.user;

import java.util.Optional;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.toy.survey.config.CustomUserPrincipal;
import com.toy.survey.domain.user.Role;
import com.toy.survey.domain.user.User;
import com.toy.survey.dto.user.LoginUserReq;
import com.toy.survey.dto.user.SignUpUserReq;
import com.toy.survey.dto.user.UserRes;
import com.toy.survey.enums.UserRoleType;
import com.toy.survey.repository.user.RoleRepository;
import com.toy.survey.repository.user.UserRepository;
import com.toy.survey.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final PasswordEncoder encoder;

  private final UserRepository userRepository;

  private final RoleRepository roleRepository;

  private final JwtUtil jwtUtil;

  /**
   * 로그인 요청을 처리하고, 성공 시 JWT 액세스 토큰을 발급한다.
   *
   * @param req 로그인 요청 DTO (아이디, 비밀번호 포함)
   * @return 발급된 JWT 액세스 토큰 문자열
   * @throws UsernameNotFoundException 아이디에 해당하는 사용자가 없을 경우
   * @throws BadCredentialsException 비밀번호가 일치하지 않을 경우
   */  
  @Override
  public String login(LoginUserReq req) {
    String userId = req.getUserId();
    User user = userRepository.findByUserId(userId)
                              .orElseThrow(() -> new UsernameNotFoundException("이메일이 존재하지 않습니다."));

    String password = req.getPassword();                              
    if (!encoder.matches(password, user.getPassword())) {
      throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
    }                              

    UserRes userResDTO = UserRes.builder()
                                .id(user.getId())
                                .userId(user.getUserId())
                                .email(user.getEmail())
                                .name(user.getName())
                                .build();
    
    return jwtUtil.createAccessToken(userResDTO);

  }

  /**
   * 회원가입 시 아이디 중복 여부를 검사한다.
   *
   * @param userId 검사할 사용자 아이디
   * @return 중복된 아이디가 존재하면 true, 아니면 false
   */  
  @Override
  public boolean checkDuplicateUserId(String userId) {
    Optional<User> duplicateUser = userRepository.findByUserId(userId);
    return duplicateUser.isPresent();    
  }

  /**
   * 회원가입 시 이메일 중복 여부를 검사한다.
   *
   * @param email 검사할 이메일 주소
   * @return 중복된 이메일이 존재하면 true, 아니면 false
   */  
  @Override
  public boolean checkDuplicateEmail(String email) {
    Optional<User> duplicateUser = userRepository.findByEmail(email);
    return duplicateUser.isPresent();
  }  

  /**
   * 신규 사용자 회원가입 처리를 수행한다.
   *
   * @param req 회원가입 요청 DTO
   */  
  @Override
  @Transactional
  public void signUp(SignUpUserReq req) {
    
    User user = req.toEntity();
    String encodedPassword = encoder.encode(user.getPassword());

    Role userRole = roleRepository.findByName("ROLE_USER")
        .orElseGet(() -> 
            roleRepository.save(Role.builder().name(UserRoleType.ROLE_USER.getRoleName()).build())
        );

    user.setRole(userRole);
    user.setEncodedPassword(encodedPassword);

    userRepository.save(user);
                   
  }

  /**
   * 현재 인증된 사용자의 ID를 조회한다.
   *
   * @return 인증된 사용자의 ID를 Optional로 반환하며, 인증 정보가 없으면 빈 Optional 반환
   */  
  @Override
  public Optional<Long> getCurrentUserId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      return Optional.empty();
    }

    Object principal = authentication.getPrincipal();

    if (principal instanceof CustomUserPrincipal) {
      CustomUserPrincipal userPrincipal = (CustomUserPrincipal) principal;
      return Optional.ofNullable(userPrincipal.getId());
    }
    return Optional.empty();
  }

  @Override
  public Optional<String> getAnonymousId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      return Optional.empty();
    }

    if (authentication instanceof AnonymousAuthenticationToken) {
      return Optional.ofNullable(authentication.getPrincipal().toString());
    }
    return Optional.empty();
  }

}
