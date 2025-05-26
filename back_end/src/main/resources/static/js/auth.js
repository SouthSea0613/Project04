$(document).ready(function () {
    const $registerForm = $('#registerForm');

    // 각 입력 필드 및 버튼 요소 가져오기 (jQuery 객체로)
    const $usernameInput = $('#username');
    const $checkUsernameBtn = $('#checkUsernameBtn');
    const $usernameHelp = $('#usernameHelp');

    const $passwordInput = $('#password');
    const $passwordHelp = $('#passwordHelp');
    const $passwordConfirmInput = $('#passwordConfirm');
    const $passwordConfirmHelp = $('#passwordConfirmHelp');

    const $emailInput = $('#email');
    const $sendEmailAuthBtn = $('#sendEmailAuthBtn');
    const $emailAuthGroup = $('#emailAuthGroup');
    const $emailAuthCodeInput = $('#emailAuthCode');
    const $checkEmailAuthBtn = $('#checkEmailAuthBtn');
    const $emailAuthHelp = $('#emailAuthHelp'); // 이메일 유효성 메시지 표시용

    const $phoneNumberInput = $('#phoneNumber');
    const $sendPhoneAuthBtn = $('#sendPhoneAuthBtn');
    const $phoneAuthGroup = $('#phoneAuthGroup');
    const $phoneAuthCodeInput = $('#phoneAuthCode');
    const $checkPhoneAuthBtn = $('#checkPhoneAuthBtn');
    const $phoneAuthHelp = $('#phoneAuthHelp');

    const $registerSubmitBtn = $('#registerSubmitBtn');

    let isUsernameChecked = false; // 아이디 중복 확인 여부
    let isEmailFormatValid = false; // 이메일 형식 유효성 상태 변수 추가
    let isEmailVerified = false;   // 이메일 인증 여부
    let isPhoneVerified = false;   // 전화번호 인증 여부

    // --- 유효성 검사 함수 ---
    function validateUsername() {
        const username = $usernameInput.val();
        const regex = /^[a-zA-Z0-9]{5,20}$/;
        if (!regex.test(username)) {
            $usernameHelp.text('아이디는 영문 또는 숫자로 5~20자여야 합니다.').removeClass('text-success text-muted').addClass('text-danger');
            return false;
        }
        $usernameHelp.text('').removeClass('text-danger text-success').addClass('text-muted');
        return true;
    }

    function validatePassword() {
        const password = $passwordInput.val();
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;
        if (!regex.test(password)) {
            $passwordHelp.text('비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자여야 합니다.').removeClass('text-success text-muted').addClass('text-danger');
            return false;
        }
        $passwordHelp.text('').removeClass('text-danger text-success').addClass('text-muted');
        return true;
    }

    function validatePasswordConfirm() {
        if ($passwordInput.val() !== $passwordConfirmInput.val()) {
            $passwordConfirmHelp.text('비밀번호가 일치하지 않습니다.').removeClass('text-success text-muted').addClass('text-danger');
            return false;
        }
        $passwordConfirmHelp.text('비밀번호가 일치합니다.').removeClass('text-danger text-muted').addClass('text-success');
        return true;
    }

    function validateEmailFormat() {
        const email = $emailInput.val();
        // 간단한 이메일 형식 정규식 (최소한 @와 . 포함 여부)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) { // 이메일이 비어있는 경우
            $emailAuthHelp.text('이메일을 입력해주세요.').removeClass('text-success text-info').addClass('text-danger');
            isEmailFormatValid = false;
            return false;
        }
        if (!regex.test(email)) {
            $emailAuthHelp.text('올바른 이메일 형식이 아닙니다 (예: user@example.com).').removeClass('text-success text-info').addClass('text-danger');
            isEmailFormatValid = false;
            return false;
        }
        $emailAuthHelp.text('').removeClass('text-danger text-success text-info'); // 유효하면 메시지 초기화
        isEmailFormatValid = true;
        return true;
    }

    // --- 이벤트 리스너 ---
    if ($usernameInput.length) {
        $usernameInput.on('input', function() {
            validateUsername();
            isUsernameChecked = false;
            $usernameHelp.text('아이디 중복 확인을 해주세요.').removeClass('text-success text-muted').addClass('text-danger');
        });
    }

    if ($checkUsernameBtn.length) {
        $checkUsernameBtn.on('click', async function () {
            if (!validateUsername()) return;
            const username = $usernameInput.val();
            try {
                // TODO: 실제 백엔드 아이디 중복 확인 API 호출 (axios 사용)
                // const response = await axios.get(`/api/auth/check-username?username=${username}`);
                // if (response.data.isAvailable) {
                //     $usernameHelp.text('사용 가능한 아이디입니다.').removeClass('text-danger text-muted').addClass('text-success');
                //     isUsernameChecked = true;
                // } else {
                //     $usernameHelp.text('이미 사용 중인 아이디입니다.').removeClass('text-success text-muted').addClass('text-danger');
                //     isUsernameChecked = false;
                // }
                // 임시 코드
                $usernameHelp.text('사용 가능한 아이디입니다. (임시)').removeClass('text-danger text-muted').addClass('text-success');
                isUsernameChecked = true;
                alert('아이디 중복 확인 (임시): 사용 가능');
            } catch (error) {
                console.error('아이디 중복 확인 오류:', error);
                $usernameHelp.text('중복 확인 중 오류가 발생했습니다.').removeClass('text-success text-muted').addClass('text-danger');
                isUsernameChecked = false;
            }
        });
    }

    if ($passwordInput.length) {
        $passwordInput.on('input', validatePassword);
    }
    if ($passwordConfirmInput.length) {
        $passwordConfirmInput.on('input', validatePasswordConfirm);
    }

    // 이메일 입력 시 형식 유효성 검사
    if ($emailInput.length) {
        $emailInput.on('input', function() {
            validateEmailFormat();
            isEmailVerified = false; // 이메일 변경 시 인증 다시 필요
            // 인증번호 발송 전에는 형식 오류만 표시하거나, "인증번호를 발송해주세요" 등으로 안내
            if (isEmailFormatValid) {
                $emailAuthHelp.text('이메일 인증을 진행해주세요.').removeClass('text-danger text-success').addClass('text-info');
            }
        });
    }

    if ($sendEmailAuthBtn.length) {
        $sendEmailAuthBtn.on('click', async function() {
            const email = $emailInput.val();
            if (!email) { // 간단한 이메일 존재 여부 확인
                alert('이메일을 입력해주세요.');
                return;
            }
            // TODO: 더 엄격한 이메일 형식 유효성 검사 추가 가능
            try {
                // TODO: 실제 백엔드 이메일 인증번호 발송 API 호출
                // await axios.post('/api/auth/send-email-verification', { email: email });
                $emailAuthGroup.show();
                $emailAuthHelp.text('인증번호가 발송되었습니다. 이메일을 확인해주세요. (임시)').removeClass('text-danger text-success').addClass('text-info');
                alert('이메일 인증번호 발송 (임시)');
            } catch (error) {
                console.error('이메일 인증번호 발송 오류:', error);
                $emailAuthHelp.text('인증번호 발송 중 오류가 발생했습니다.').removeClass('text-info text-success').addClass('text-danger');
            }
        });
    }

    if ($checkEmailAuthBtn.length) {
        $checkEmailAuthBtn.on('click', async function() {
            const email = $emailInput.val();
            const code = $emailAuthCodeInput.val();
            if (!code) {
                alert('인증번호를 입력해주세요.');
                return;
            }
            try {
                // TODO: 실제 백엔드 이메일 인증번호 확인 API 호출
                // const response = await axios.post('/api/auth/verify-email-code', { email: email, code: code });
                // if (response.data.isVerified) {
                //     $emailAuthHelp.text('이메일 인증이 완료되었습니다.').removeClass('text-danger text-info').addClass('text-success');
                //     isEmailVerified = true;
                //     $sendEmailAuthBtn.prop('disabled', true);
                //     $checkEmailAuthBtn.prop('disabled', true);
                //     $emailInput.prop('readonly', true);
                // } else {
                //     $emailAuthHelp.text('인증번호가 올바르지 않습니다.').removeClass('text-success text-info').addClass('text-danger');
                // }
                // 임시 코드
                $emailAuthHelp.text('이메일 인증이 완료되었습니다. (임시)').removeClass('text-danger text-info').addClass('text-success');
                isEmailVerified = true;
                alert('이메일 인증 확인 (임시): 성공');
            } catch (error) {
                console.error('이메일 인증 확인 오류:', error);
                $emailAuthHelp.text('인증 확인 중 오류가 발생했습니다.').removeClass('text-success text-info').addClass('text-danger');
            }
        });
    }

    if ($sendPhoneAuthBtn.length) {
        $sendPhoneAuthBtn.on('click', async function() {
            const phone = $phoneNumberInput.val();
            if (!phone) { // 간단한 전화번호 존재 여부 확인
                alert('전화번호를 입력해주세요.');
                return;
            }
            // TODO: 더 엄격한 전화번호 형식 유효성 검사 추가 가능
            try {
                // TODO: 실제 백엔드 전화번호 인증번호 발송 API 호출
                $phoneAuthGroup.show();
                $phoneAuthHelp.text('인증번호가 발송되었습니다. (임시)').removeClass('text-danger text-success').addClass('text-info');
                alert('전화번호 인증번호 발송 (임시)');
            } catch (error) {
                console.error('전화번호 인증번호 발송 오류:', error);
                $phoneAuthHelp.text('인증번호 발송 중 오류가 발생했습니다.').removeClass('text-info text-success').addClass('text-danger');
            }
        });
    }

    if ($checkPhoneAuthBtn.length) {
        $checkPhoneAuthBtn.on('click', async function() {
            const phone = $phoneNumberInput.val();
            const code = $phoneAuthCodeInput.val();
            if (!code) {
                alert('인증번호를 입력해주세요.');
                return;
            }
            try {
                // TODO: 실제 백엔드 전화번호 인증번호 확인 API 호출
                // 임시 코드
                $phoneAuthHelp.text('전화번호 인증이 완료되었습니다. (임시)').removeClass('text-danger text-info').addClass('text-success');
                isPhoneVerified = true;
                alert('전화번호 인증 확인 (임시): 성공');
            } catch (error) {
                console.error('전화번호 인증 확인 오류:', error);
                $phoneAuthHelp.text('인증 확인 중 오류가 발생했습니다.').removeClass('text-success text-info').addClass('text-danger');
            }
        });
    }

    // 폼 제출 이벤트
    if ($registerForm.length) {
        $registerForm.on('submit', function (event) {
            event.preventDefault();

            const isUsernameValid = validateUsername();
            const isPasswordValid = validatePassword();
            const isPasswordConfirmValid = validatePasswordConfirm();
            const isEmailFormatCurrentlyValid = validateEmailFormat(); // 제출 시점에서도 이메일 형식 확인

            if (!isUsernameValid || !isPasswordValid || !isPasswordConfirmValid || !isEmailFormatCurrentlyValid) {
                alert('입력 정보를 다시 확인해주세요.');
                // 어느 필드가 잘못되었는지 포커스를 줄 수도 있음
                if (!isUsernameValid) $usernameInput.focus();
                else if (!isPasswordValid) $passwordInput.focus();
                else if (!isPasswordConfirmValid) $passwordConfirmInput.focus();
                else if (!isEmailFormatCurrentlyValid) $emailInput.focus();
                return;
            }
            if (!isUsernameChecked) {
                alert('아이디 중복 확인을 해주세요.');
                $usernameInput.focus();
                return;
            }
            // 이메일 인증을 필수로 할 경우 isEmailVerified 확인
            // if (!isEmailVerified) {
            //     alert('이메일 인증을 완료해주세요.');
            //     $emailAuthCodeInput.focus();
            //     return;
            // }
            // 전화번호 인증을 필수로 할 경우 isPhoneVerified 확인
            // if (!isPhoneVerified) {
            //     alert('전화번호 인증을 완료해주세요.');
            //     $phoneAuthCodeInput.focus();
            //     return;
            // }


            const formData = new FormData(this); // 'this'는 폼 엘리먼트
            const data = Object.fromEntries(formData.entries());
            console.log('제출할 데이터:', data);

            // TODO: 실제 백엔드 회원가입 API 호출 (axios 사용)
            axios.post('/api/auth/register', data)
                .then(function (response) {
                    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
                    window.location.href = '/auth/login';
                })
                .catch(function (error) {
                    console.error('회원가입 오류:', error);
                    if (error.response && error.response.data && error.response.data.message) {
                        alert('회원가입 실패: ' + error.response.data.message);
                    } else {
                        alert('회원가입 중 오류가 발생했습니다.');
                    }
                });
        });
    }
});

// 카카오 우편번호 서비스 API 함수
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            $('#postcode').val(data.zonecode);
            $('#address').val((data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress));
            $('#detailAddress').focus();

            var extraAddr = '';
            if (data.userSelectedType === 'R') {
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
            }
            $('#extraAddress').val(extraAddr);
        }
    }).open();
}