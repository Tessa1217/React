package com.toy.survey.service.user;

import java.util.Optional;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.toy.survey.domain.user.User;
import com.toy.survey.dto.user.LoginUserReq;
import com.toy.survey.dto.user.SignUpUserReq;
import com.toy.survey.dto.user.UserRes;
import com.toy.survey.repository.user.UserRepository;
import com.toy.survey.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final PasswordEncoder encoder;

  private final UserRepository userRepository;

  private final JwtUtil jwtUtil;

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

  @Override
  public boolean checkDuplicateUserId(String userId) {
    Optional<User> duplicateUser = userRepository.findByUserId(userId);
    return duplicateUser.isPresent();    
  }

  @Override
  public boolean checkDuplicateEmail(String email) {
    Optional<User> duplicateUser = userRepository.findByEmail(email);
    return duplicateUser.isPresent();
  }  

  @Override
  public void signUp(SignUpUserReq req) {
    
    User user = req.toEntity();
    String encodedPassword = encoder.encode(user.getPassword());
    user.setEncodedPassword(encodedPassword);
    userRepository.save(user);
                   
  }
  
}
