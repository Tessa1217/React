package com.toy.survey.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class) 
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    public Map<String, String> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {        
        String message = ex.getBindingResult().getAllErrors()
                           .stream()
                           .findFirst()
                           .map((err) -> (FieldError) err)
                           .map(FieldError::getDefaultMessage)
                           .orElse("유효하지 않은 정보입니다.");                
        return Map.of("message", message);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleUnauthorized(UnauthorizedException ex) {
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, String> handleForbidden(ForbiddenException ex) {
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleNotFound(NotFoundException ex) {
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(DuplicateDataException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleDuplicateData(DuplicateDataException ex) {
        return Map.of("message", ex.getMessage());
    }


    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleGeneric(Exception ex) {
        return Map.of("message", "서버 내부 오류가 발생했습니다.");
    }  
  
}
