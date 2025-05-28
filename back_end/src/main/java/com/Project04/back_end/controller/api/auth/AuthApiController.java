package com.Project04.back_end.controller.api.auth;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthApiController {
    @PostMapping("/check-username")
    public String checkUsername() {
        return "checkUsername";
    }
}
