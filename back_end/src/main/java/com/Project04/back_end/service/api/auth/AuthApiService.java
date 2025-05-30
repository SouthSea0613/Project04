package com.Project04.back_end.service.api.auth;

import com.Project04.back_end.mapper.api.auth.AuthApiMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthApiService {
    public final AuthApiMapper authApiMapper;

    public boolean checkUsername(String username) {
        return !authApiMapper.checkUsername(username);
    }
}
