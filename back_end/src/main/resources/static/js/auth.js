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

    const $nameInput = $('#name');
    const $nameHelp = $('#nameHelp');

    const $emailInput = $('#email');
    const $sendEmailAuthBtn = $('#sendEmailAuthBtn');
    const $emailAuthGroup = $('#emailAuthGroup');
    const $emailAuthCodeInput = $('#emailAuthCode');
    const $checkEmailAuthBtn = $('#checkEmailAuthBtn');
    const $emailFormatHelp = $('#emailFormatHelp'); // HTML에 이 ID로 <small> 태그가 있다고 가정
    const $emailAuthCodeHelp = $('#emailAuthCodeHelp'); // HTML에 이 ID로 <small> 태그가 있다고 가정

    const $registerSubmitBtn = $('#registerSubmitBtn');

    let isUsernameChecked = false;
    let isNameValid = false;
    let isEmailFormatValid = false;
    let isEmailVerified = false;

    // --- 유효성 검사 함수 ---
    function validateUsername() {
        const username = $usernameInput.val();
        const regex = /^[a-zA-Z0-9]{5,20}$/;
        if (!regex.test(username)) {
            $usernameHelp.text('아이디는 영문 또는 숫자로 5~20자여야 합니다.').removeClass('text-success text-muted').addClass('text-danger');
            return false;
        }
        // 중복 확인 전 메시지 처리 (이전과 동일하게 유지 또는 필요시 수정)
        // $usernameHelp.text('아이디 중복 확인을 해주세요.').removeClass('text-success text-muted').addClass('text-danger');
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

    function validateName() {
        const name = $nameInput.val().trim();
        const regexKor = /^[가-힣]{2,10}$/;
        const regexEng = /^[a-zA-Z]{2,30}(?:\s[a-zA-Z]{1,30})*$/;

        if (!name) {
            if ($nameHelp.length) $nameHelp.text('이름을 입력해주세요.').removeClass('text-success').addClass('text-danger');
            isNameValid = false;
            return false;
        }
        if (!regexKor.test(name) && !regexEng.test(name)) {
            if ($nameHelp.length) $nameHelp.text('올바른 이름 형식이 아닙니다 (한글 2~10자 또는 영문).').removeClass('text-success').addClass('text-danger');
            isNameValid = false;
            return false;
        }
        if ($nameHelp.length) $nameHelp.text('').removeClass('text-danger text-success');
        isNameValid = true;
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
            if (!validateUsername()) {
                $usernameInput.focus();
                return;
            }
            const username = $usernameInput.val();
            try {
                // TODO: 실제 백엔드 아이디 중복 확인 API 호출 (axios 사용)
                const response = await axios.post(`/api/auth/check-username?username=${username}`);
                if (response.data.isAvailable) {
                    $usernameHelp.text(response.data.message).removeClass('text-danger text-muted').addClass('text-success');
                    isUsernameChecked = true;
                } else {
                    $usernameHelp.text(response.data.message).removeClass('text-success text-muted').addClass('text-danger');
                    isUsernameChecked = false;
                }
            } catch (error) {
                console.error('아이디 중복 확인 오류:', error);
                $usernameHelp.text(response.data.message).removeClass('text-success text-muted').addClass('text-danger');
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

    if ($nameInput.length) {
        $nameInput.on('input', validateName);
    }

    if ($emailInput.length) {
        $emailInput.on('input', function() {
            validateEmailFormat();
            isEmailVerified = false;
            if (isEmailFormatValid) {
                if ($emailFormatHelp.length) $emailFormatHelp.text('이메일 인증을 진행해주세요.').removeClass('text-danger text-success').addClass('text-info');
            }
            if ($emailAuthGroup.is(':visible') && $emailAuthCodeHelp.length) {
                $emailAuthCodeHelp.text('');
            }
        });
    }

    if ($sendEmailAuthBtn.length) {
        $sendEmailAuthBtn.on('click', async function() {
            if (!validateEmailFormat()) {
                $emailInput.focus();
                return;
            }
            const email = $emailInput.val();
            try {
                // TODO: 실제 백엔드 이메일 인증번호 발송 API 호출
                $emailAuthGroup.show();
                if ($emailAuthCodeHelp.length) $emailAuthCodeHelp.text('인증번호가 발송되었습니다. 이메일을 확인해주세요. (임시)').removeClass('text-danger text-success').addClass('text-info');
            } catch (error) {
                console.error('이메일 인증번호 발송 오류:', error);
                if ($emailAuthCodeHelp.length) $emailAuthCodeHelp.text('인증번호 발송 중 오류가 발생했습니다.').removeClass('text-info text-success').addClass('text-danger');
            }
        });
    }

    if ($checkEmailAuthBtn.length) {
        $checkEmailAuthBtn.on('click', async function() {
            const email = $emailInput.val();
            const code = $emailAuthCodeInput.val();
            if (!code) {
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
            } catch (error) {
                console.error('이메일 인증 확인 오류:', error);
                if ($emailAuthCodeHelp.length) $emailAuthCodeHelp.text('인증 확인 중 오류가 발생했습니다.').removeClass('text-info text-success').addClass('text-danger');
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
            const isCurrentNameValid = validateName();
            const isEmailCurrentlyValid = validateEmailFormat();

            let finalChecksPass = true;
            let focusTarget = null;

            if (!isUsernameValid) {
                finalChecksPass = false; if (!focusTarget) focusTarget = $usernameInput;
            }
            if (!isPasswordValid) {
                finalChecksPass = false; if (!focusTarget) focusTarget = $passwordInput;
            }
            if (!isPasswordConfirmValid) {
                finalChecksPass = false; if (!focusTarget) focusTarget = $passwordConfirmInput;
            }
            if (!isCurrentNameValid) {
                finalChecksPass = false; if (!focusTarget) focusTarget = $nameInput;
            }
            if (!isEmailCurrentlyValid) {
                finalChecksPass = false; if (!focusTarget) focusTarget = $emailInput;
            }
            // 전화번호 유효성 확인 로직 삭제
            // if (!isPhoneCurrentlyValid) { ... }

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
            // 이메일 인증 필수 여부에 따라 isEmailVerified 조건 추가
            // if (!isEmailVerified) {
            //     alert('이메일 인증을 완료해주세요.');
            //     $emailAuthCodeInput.focus();
            //     return;
            // }


            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries()); // 'phoneNumber' 관련 필드는 이제 포함되지 않음
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

// 카카오 우편번호 서비스 API 함수 (이전과 동일하게 유지, 전화번호 필드와는 무관)
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            $('#postcode').val(data.zonecode);
            $('#address').val((data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress));
            $('#detailAddress').focus();

            var extraAddr = '';
            if(data.userSelectedType === 'R'){
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
            }
            $('#extraAddress').val(extraAddr);
        }
    }).open();
}