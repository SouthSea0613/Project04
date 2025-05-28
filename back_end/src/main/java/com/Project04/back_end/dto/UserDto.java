package com.Project04.back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    int user_id;
    String username;
    String password;
    String name;
    String email;
    String postcode;
    String address;
    String detailAddress;
    String extra_address;
    String role;

}
