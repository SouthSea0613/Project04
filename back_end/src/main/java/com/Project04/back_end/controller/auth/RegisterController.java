package com.Project04.back_end.controller.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Slf4j
@Controller
public class RegisterController {
    @GetMapping("/register")
    public String register() {
        log.info("register()");
        return "Register";
    }

    @PostMapping("/register")
    public String registerProcess() {
        log.info("registerProcess()");
        return null;
    }
}
