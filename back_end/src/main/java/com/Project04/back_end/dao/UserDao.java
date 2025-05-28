package com.Project04.back_end.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {
    boolean checkUsername(String username);
}
