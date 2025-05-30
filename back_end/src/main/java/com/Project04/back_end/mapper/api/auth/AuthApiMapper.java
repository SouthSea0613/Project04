package com.Project04.back_end.mapper.api.auth;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthApiMapper {
    boolean checkUsername(String username);
}
