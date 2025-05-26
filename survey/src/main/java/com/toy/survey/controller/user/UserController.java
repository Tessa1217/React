package com.toy.survey.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.toy.survey.dto.user.LoginUserReq;
import com.toy.survey.dto.user.SignUpUserReq;
import com.toy.survey.service.user.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
public class UserController {

  private final UserService userService;
  
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginUserReq loginUser) {
    String token = userService.login(loginUser);
    return ResponseEntity.ok().body(token);
  }

  @GetMapping("/{email}/exists")
  public ResponseEntity<Boolean> checkDuplicateEmail(@PathVariable String email) {
    return ResponseEntity.ok(userService.checkDuplicateEmail(email));
  }

  @PostMapping("/signUp")
  public ResponseEntity<Boolean> signUp(@RequestBody @Validated SignUpUserReq signUpUser) {
    userService.signUp(signUpUser);
    return ResponseEntity.ok().body(true);
  }
  
}
