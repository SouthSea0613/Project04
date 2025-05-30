package com.Project04.back_end.controller.api.auth;

import com.Project04.back_end.dto.response.CheckUsernameResponseDto;
import com.Project04.back_end.service.api.auth.AuthApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthApiController {
    public final AuthApiService authApiService;

    @PostMapping("/check-username")
    public ResponseEntity<CheckUsernameResponseDto> checkUsername(@RequestParam String username) {
        log.info("Checking username");

        if (username == null || username.trim().isEmpty()) {
            CheckUsernameResponseDto responseDto = new CheckUsernameResponseDto(false, "아이디를 입력해주세요.");
            return ResponseEntity.badRequest().body(responseDto); // 400 Bad Request
        }

        try {
            boolean isAvailable = authApiService.checkUsername(username);
            String message = isAvailable ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.";
            CheckUsernameResponseDto responseDto = new CheckUsernameResponseDto(isAvailable, message);
            return ResponseEntity.ok(responseDto); // 200 OK
        } catch (Exception e) {
            System.err.println("Error checking username availability: " + e.getMessage()); // 실제로는 Logger 사용
            CheckUsernameResponseDto responseDto = new CheckUsernameResponseDto(false, "아이디 중복 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseDto); // 500 Internal Server Error
        }
    }
}
