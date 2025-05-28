package com.Project04.back_end.service;

import com.Project04.back_end.dao.UserDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {
    private final UserDao userDao;
    public boolean checkUsername(String username) {
        log.info("서비스{}", username);
        if(userDao.checkUsername(username)){
            log.info("중복 체크");
            return true;
        }
        return false;
    }
}
