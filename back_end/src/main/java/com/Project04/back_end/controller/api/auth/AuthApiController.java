package com.Project04.back_end.controller.api.auth;

import com.Project04.back_end.dao.UserDao;
import com.Project04.back_end.dto.UserDto;
import com.Project04.back_end.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthApiController {
    private final UserService userService;

    @PostMapping("/check-username")
    public boolean checkUsername(@RequestBody UserDto userDto) {
        log.info(userDto.getUsername());
        if(userService.checkUsername(userDto.getUsername())) {
            return true;
        }
            return false;
    }
}
