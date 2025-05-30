package com.Project04.back_end.service;

import com.Project04.back_end.dto.response.ApiResponseDto;

public interface EmailService {
    /**
     * 이메일 중복 확인 후 인증번호를 발송합니다.
     * @param email 대상 이메일 주소
     * @return 성공 여부 및 메시지를 담은 ApiResponseDto
     * @throws Exception 메일 발송 실패 또는 기타 예외
     */
    ApiResponseDto<?> sendVerificationEmail(String email) throws Exception;

    /**
     * 입력된 인증번호를 검증합니다.
     * @param email 대상 이메일 주소
     * @param code 사용자가 입력한 인증번호
     * @return 성공 여부 및 메시지를 담은 ApiResponseDto
     */
    ApiResponseDto<?> verifyEmailCode(String email, String code);
}
