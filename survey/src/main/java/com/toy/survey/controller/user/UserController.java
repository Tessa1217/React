package com.toy.survey.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.survey.dto.user.LoginUserReq;
import com.toy.survey.dto.user.SignUpUserReq;
import com.toy.survey.service.user.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;

@Tag(name = "User-Controller", description = "회원 관리 API")
@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
public class UserController {

  private final UserService userService;
  
  @PostMapping("/login")
  @Operation(
    summary = "로그인",
    description = "사용자의 아이디와 비밀번호를 받아 JWT 토큰을 발급합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "로그인 성공 (JWT 토큰 반환)"),
      @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content)
    }
  )  
  public ResponseEntity<String> login(@RequestBody @Schema(implementation = LoginUserReq.class) @Valid LoginUserReq loginUser) throws InterruptedException {    
    String token = userService.login(loginUser);
    return ResponseEntity.ok().body(token);
  }

  @GetMapping("/exists/email/{email}")
  @Operation(
    summary = "이메일 중복 확인",
    description = "이메일이 이미 가입되어 있는지 확인합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "이메일 중복 여부 반환"),
      @ApiResponse(responseCode = "400", description = "잘못된 이메일 형식", content = @Content)
    }
  )  
  public ResponseEntity<Boolean> checkDuplicateEmail(@Parameter(description = "확인할 이메일", required = true, example = "user@example.com")
                                                     @PathVariable @Valid 
                                                     @NotBlank(message = "이메일은 필수값입니다.")
                                                     @Email(message = "올바른 이메일 주소를 입력해주세요.")
                                                     @Size(max = 200) String email) {
    return ResponseEntity.ok(userService.checkDuplicateEmail(email));
  }

  @GetMapping("/exists/userId/{userId}")
  @Operation(
    summary = "아이디 중복 확인",
    description = "아이디가 이미 가입되어 있는지 확인합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "아이디 중복 여부 반환"),
      @ApiResponse(responseCode = "400", description = "잘못된 아이디 형식", content = @Content)
    }
  )    
  public ResponseEntity<Boolean> checkDuplicateUserId(@Parameter(description = "확인할 아이디", required = true, example = "use1234")
                                                      @PathVariable @Valid 
                                                      @Size(min = 5, max = 50, message="아이디는 5자리 이상 50자리 이하로 입력해주세요.") String userId) {
    return ResponseEntity.ok(userService.checkDuplicateUserId(userId));
  }  

  @PostMapping("/signUp")
  @Operation(
    summary = "회원가입",
    description = "신규 사용자를 등록합니다.",
    responses = {
      @ApiResponse(responseCode = "200", description = "회원가입 성공"),
      @ApiResponse(responseCode = "400", description = "입력값 오류", content = @Content)
    }
  )    
  public ResponseEntity<Boolean> signUp(@RequestBody @Schema(implementation = SignUpUserReq.class) 
                                        @Valid SignUpUserReq signUpUser) {
    userService.signUp(signUpUser);
    return ResponseEntity.ok().body(true);
  }
  
}
