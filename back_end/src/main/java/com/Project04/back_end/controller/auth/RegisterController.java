package com.Project04.back_end.controller.auth;

import com.Project04.back_end.dto.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Controller("/auth")
public class RegisterController {
    @GetMapping("/register")
    public String register() {
        log.info("register()");
        return "auth/register";
    }

    @PostMapping("/register")
    public String register(UserDto userDto) {
        return "auth/login";
    }
}
