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
    const $emailAuthGroup = $('#emailAuthGroup'); // 이메일 인증번호 입력 그룹
    const $emailAuthCodeInput = $('#emailAuthCode');
    const $checkEmailAuthBtn = $('#checkEmailAuthBtn');
    const $emailFormatHelp = $('#emailFormatHelp'); // HTML에 이 ID로 <small> 태그가 있다고 가정
    const $emailAuthCodeHelp = $('#emailAuthCodeHelp'); // HTML에 이 ID로 <small> 태그가 있다고 가정

    const $phoneNumberInput = $('#phoneNumber');
    const $sendPhoneAuthBtn = $('#sendPhoneAuthBtn');
    const $phoneAuthGroup = $('#phoneAuthGroup'); // 전화번호 인증번호 입력 그룹
    const $phoneAuthCodeInput = $('#phoneAuthCode');
    const $checkPhoneAuthBtn = $('#checkPhoneAuthBtn');
    const $phoneHelp = $('#phoneHelp'); // 전화번호 유효성 메시지 표시용 (HTML에 새로 추가 필요 가정)

    const $registerSubmitBtn = $('#registerSubmitBtn');

    let isUsernameChecked = false;
    let isEmailFormatValid = false;
    let isEmailVerified = false;
    let isPhoneNumberValid = false; // 전화번호 유효성 상태 변수 추가
    let isPhoneVerified = false;


    // --- 유효성 검사 함수 ---
    function validateUsername() {
        const username = $usernameInput.val();
        const regex = /^[a-zA-Z0-9]{5,20}$/;
        if (!regex.test(username)) {
            $usernameHelp.text('아이디는 영문 또는 숫자로 5~20자여야 합니다.').removeClass('text-success text-muted').addClass('text-danger');
            return false;
        }
        // 중복 확인 전까지는 특정 메시지 유지 또는 초기화
        // $usernameHelp.text('').removeClass('text-danger text-success').addClass('text-muted');
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            if ($emailFormatHelp.length) $emailFormatHelp.text('이메일을 입력해주세요.').removeClass('text-success text-info').addClass('text-danger');
            isEmailFormatValid = false;
            return false;
        }
        if (!regex.test(email)) {
            if ($emailFormatHelp.length) $emailFormatHelp.text('올바른 이메일 형식이 아닙니다 (예: user@example.com).').removeClass('text-success text-info').addClass('text-danger');
            isEmailFormatValid = false;
            return false;
        }
        if ($emailFormatHelp.length) $emailFormatHelp.text('').removeClass('text-danger text-success text-info');
        isEmailFormatValid = true;
        return true;
    }

    // 전화번호 유효성 검사 함수 추가
    function validatePhoneNumber() {
        const phoneNumber = $phoneNumberInput.val();
        // 예: 숫자만 10~11자리 (하이픈 없이)
        const regex = /^[0-9]{10,11}$/;
        if (!phoneNumber) {
            if ($phoneHelp.length) $phoneHelp.text('전화번호를 입력해주세요.').removeClass('text-success text-info').addClass('text-danger');
            isPhoneNumberValid = false;
            return false;
        }
        if (!regex.test(phoneNumber)) {
            if ($phoneHelp.length) $phoneHelp.text('올바른 전화번호 형식이 아닙니다 (숫자만 10~11자리).').removeClass('text-success text-info').addClass('text-danger');
            isPhoneNumberValid = false;
            return false;
        }
        if ($phoneHelp.length) $phoneHelp.text('').removeClass('text-danger text-success text-info');
        isPhoneNumberValid = true;
        return true;
    }

    // --- 이벤트 리스너 ---
    if ($usernameInput.length) {
        $usernameInput.on('input', function () {
            validateUsername();
            isUsernameChecked = false;
            $usernameHelp.text('아이디 중복 확인을 해주세요.').removeClass('text-success text-muted').addClass('text-danger');
        });
    }

    if ($checkUsernameBtn.length) {
        $checkUsernameBtn.on('click', async function () {
            if (!validateUsername()) {
                $usernameInput.focus();
                return;
            }
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
                $usernameHelp.text('사용 가능한 아이디입니다. (임시)').removeClass('text-danger text-muted').addClass('text-success');
                isUsernameChecked = true;
                // alert('아이디 중복 확인 (임시): 사용 가능'); // 실제 서비스에서는 alert 제거
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

    if ($emailInput.length) {
        $emailInput.on('input', function () {
            validateEmailFormat();
            isEmailVerified = false;
            if (isEmailFormatValid) {
                if ($emailFormatHelp.length) $emailFormatHelp.text('이메일 인증을 진행해주세요.').removeClass('text-danger text-success').addClass('text-info');
            }
            // 인증번호 입력 필드가 이미 보이고 있다면, 이메일 변경 시 관련 메시지 초기화
            if ($emailAuthGroup.is(':visible') && $emailAuthCodeHelp.length) {
                $emailAuthCodeHelp.text('');
            }
        });
    }

    if ($sendEmailAuthBtn.length) {
        $sendEmailAuthBtn.on('click', async function () {
            if (!validateEmailFormat()) {
                $emailInput.focus();
                return;
            }
            const email = $emailInput.val();
            try {
                // TODO: 실제 백엔드 이메일 인증번호 발송 API 호출
                $emailAuthGroup.show();
                if ($emailAuthCodeHelp.length) $emailAuthCodeHelp.text('인증번호가 발송되었습니다. 이메일을 확인해주세요. (임시)').removeClass('text-danger text-success').addClass('text-info');
                // alert('이메일 인증번호 발송 (임시)');
            } catch (error) {
                console.error('이메일 인증번호 발송 오류:', error);
                if ($emailAuthCodeHelp.length) $emailAuthCodeHelp.text('인증번호 발송 중 오류가 발생했습니다.').removeClass('text-info text-success').addClass('text-danger');
            }
        });
    }

    if ($checkEmailAuthBtn.length) {
        $checkEmailAuthBtn.on('click', async function () {
            const email = $emailInput.val();
            const code = $emailAuthCodeInput.val();
            if (!code) {
                // alert('인증번호를 입력해주세요.');
                if ($emailAuthCodeHelp.length) $emailAuthCodeHelp.text('인증번호를 입력해주세요.').removeClass('text-info text-success').addClass('text-danger');
                $emailAuthCodeInput.focus();
                return;
            }
            try {
                // TODO: 실제 백엔드 이메일 인증번호 확인 API 호출
                if ($emailAuthCodeHelp.length) $emailAuthCodeHelp.text('이메일 인증이 완료되었습니다. (임시)').removeClass('text-danger text-info').addClass('text-success');
                isEmailVerified = true;
                $sendEmailAuthBtn.prop('disabled', true);
                $checkEmailAuthBtn.prop('disabled', true);
                $emailInput.prop('readonly', true);
                // alert('이메일 인증 확인 (임시): 성공');
            } catch (error) {
                console.error('이메일 인증 확인 오류:', error);
                if ($emailAuthCodeHelp.length) $emailAuthCodeHelp.text('인증 확인 중 오류가 발생했습니다.').removeClass('text-info text-success').addClass('text-danger');
            }
        });
    }

    // 전화번호 입력 시 형식 유효성 검사
    if ($phoneNumberInput.length) {
        $phoneNumberInput.on('input', function () {
            validatePhoneNumber();
            isPhoneVerified = false; // 전화번호 변경 시 인증 다시 필요
            if (isPhoneNumberValid) {
                if ($phoneHelp.length) $phoneHelp.text('전화번호 인증을 진행해주세요.').removeClass('text-danger text-success').addClass('text-info');
            }
            // 인증번호 입력 필드가 이미 보이고 있다면, 전화번호 변경 시 관련 메시지 초기화
            if ($phoneAuthGroup.is(':visible') && $phoneHelp.length) { // phoneAuthHelp이 아니라 phoneHelp이 맞음
                // $phoneAuthHelp.text(''); // 이 부분은 phoneAuthCodeHelp에 해당
            }
        });
    }

    if ($sendPhoneAuthBtn.length) {
        $sendPhoneAuthBtn.on('click', async function () {
            if (!validatePhoneNumber()) { // 전화번호 형식부터 검사
                $phoneNumberInput.focus();
                return;
            }
            const phone = $phoneNumberInput.val();
            try {
                // TODO: 실제 백엔드 전화번호 인증번호 발송 API 호출
                $phoneAuthGroup.show();
                if ($phoneAuthCodeHelp.length) $phoneAuthCodeHelp.text('인증번호가 발송되었습니다. (임시)').removeClass('text-danger text-success').addClass('text-info'); // 이부분도 새 ID로
                // alert('전화번호 인증번호 발송 (임시)');
            } catch (error) {
                console.error('전화번호 인증번호 발송 오류:', error);
                if ($phoneAuthCodeHelp.length) $phoneAuthCodeHelp.text('인증번호 발송 중 오류가 발생했습니다.').removeClass('text-info text-success').addClass('text-danger');
            }
        });
    }

    if ($checkPhoneAuthBtn.length) {
        $checkPhoneAuthBtn.on('click', async function () {
            // const phone = $phoneNumberInput.val(); // 필요시 사용
            const code = $phoneAuthCodeInput.val();
            if (!code) {
                // alert('인증번호를 입력해주세요.');
                if ($phoneAuthCodeHelp.length) $phoneAuthCodeHelp.text('인증번호를 입력해주세요.').removeClass('text-info text-success').addClass('text-danger');
                $phoneAuthCodeInput.focus();
                return;
            }
            try {
                // TODO: 실제 백엔드 전화번호 인증번호 확인 API 호출
                if ($phoneAuthCodeHelp.length) $phoneAuthCodeHelp.text('전화번호 인증이 완료되었습니다. (임시)').removeClass('text-danger text-info').addClass('text-success');
                isPhoneVerified = true;
                $sendPhoneAuthBtn.prop('disabled', true);
                $checkPhoneAuthBtn.prop('disabled', true);
                $phoneNumberInput.prop('readonly', true);
                // alert('전화번호 인증 확인 (임시): 성공');
            } catch (error) {
                console.error('전화번호 인증 확인 오류:', error);
                if ($phoneAuthCodeHelp.length) $phoneAuthCodeHelp.text('인증 확인 중 오류가 발생했습니다.').removeClass('text-info text-success').addClass('text-danger');
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
            const isEmailCurrentlyValid = validateEmailFormat();
            const isPhoneCurrentlyValid = validatePhoneNumber(); // 제출 시 전화번호 형식도 최종 확인

            let finalChecksPass = true;
            let focusTarget = null;

            if (!isUsernameValid) {
                finalChecksPass = false;
                if (!focusTarget) focusTarget = $usernameInput;
            }
            if (!isPasswordValid) {
                finalChecksPass = false;
                if (!focusTarget) focusTarget = $passwordInput;
            }
            if (!isPasswordConfirmValid) {
                finalChecksPass = false;
                if (!focusTarget) focusTarget = $passwordConfirmInput;
            }
            if (!isEmailCurrentlyValid) {
                finalChecksPass = false;
                if (!focusTarget) focusTarget = $emailInput;
            }
            if (!isPhoneCurrentlyValid) { // 전화번호 형식 유효성 확인
                finalChecksPass = false;
                if (!focusTarget) focusTarget = $phoneNumberInput;
            }

            if (!finalChecksPass) {
                alert('입력 정보를 다시 확인해주세요.');
                if (focusTarget) focusTarget.focus();
                return;
            }

            if (!isUsernameChecked) {
                alert('아이디 중복 확인을 해주세요.');
                $usernameInput.focus();
                return;
            }
            // TODO: 이메일, 전화번호 인증 필수 여부에 따라 isEmailVerified, isPhoneVerified 조건 추가
            // if (!isEmailVerified) { // 이메일 인증을 필수로 하는 경우
            //     alert('이메일 인증을 완료해주세요.');
            //     $emailAuthCodeInput.focus();
            //     return;
            // }
            // if (!isPhoneVerified) { // 전화번호 인증을 필수로 하는 경우
            //     alert('전화번호 인증을 완료해주세요.');
            //     $phoneAuthCodeInput.focus();
            //     return;
            // }

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            console.log('제출할 데이터:', data);

            // TODO: 실제 백엔드 회원가입 API 호출 (axios 사용)
            axios.post('/api/auth/register', data)
                .then(function (response) {
                    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
                    window.location.href = '/auth/login'; // 실제 로그인 페이지 URL로 수정
                })
                .catch(function (error) {
                    console.error('회원가입 오류:', error);
                    if (error.response && error.response.data && error.response.data.message) {
                        alert('회원가입 실패: ' + error.response.data.message);
                    } else {
                        alert('회원가입 중 오류가 발생했습니다. 서버 로그를 확인해주세요.');
                    }
                });
        });
    }
});

// 카카오 우편번호 서비스 API 함수
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
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