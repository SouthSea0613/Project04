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
    const $emailAuthHelp = $('#emailAuthHelp');

    const $phoneNumberInput = $('#phoneNumber');
    const $sendPhoneAuthBtn = $('#sendPhoneAuthBtn');
    const $phoneAuthGroup = $('#phoneAuthGroup');
    const $phoneAuthCodeInput = $('#phoneAuthCode');
    const $checkPhoneAuthBtn = $('#checkPhoneAuthBtn');
    const $phoneAuthHelp = $('#phoneAuthHelp');

    const $registerSubmitBtn = $('#registerSubmitBtn');

    let isUsernameChecked = false; // 아이디 중복 확인 여부
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
            event.preventDefault(); // 기본 폼 제출 방지

            // 모든 유효성 검사 및 인증 확인
            const isUsernameValid = validateUsername();
            const isPasswordValid = validatePassword();
            const isPasswordConfirmValid = validatePasswordConfirm();

            if (!isUsernameValid || !isPasswordValid || !isPasswordConfirmValid) {
                alert('입력 정보를 다시 확인해주세요.');
                return;
            }
            if (!isUsernameChecked) {
                alert('아이디 중복 확인을 해주세요.');
                $usernameInput.trigger('focus'); // jQuery focus() 대신 trigger('focus') 사용 가능
                return;
            }
            // TODO: 이메일, 전화번호 필수 여부에 따라 isEmailVerified, isPhoneVerified 조건 추가
            // if (!isEmailVerified) {
            //     alert('이메일 인증을 완료해주세요.');
            //     $emailAuthCodeInput.trigger('focus');
            //     return;
            // }
            // if (!isPhoneVerified) {
            //     alert('전화번호 인증을 완료해주세요.');
            //     $phoneAuthCodeInput.trigger('focus');
            //     return;
            // }

            // 모든 검증 통과 시 폼 데이터 제출
            const formData = $(this).serializeArray(); // 폼 데이터를 배열로 직렬화
            const data = {};
            $.each(formData, function(i, field){
                data[field.name] = field.value;
            });
            console.log('제출할 데이터:', data);

            // TODO: 실제 백엔드 회원가입 API 호출 (axios 사용)
            axios.post('/api/auth/register', data) // 백엔드 API 엔드포인트
                .then(function (response) {
                    alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
                    window.location.href = '/auth/login'; // 로그인 페이지로 리디렉션
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
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("extraAddress").value = extraAddr;

            } else {
                document.getElementById("extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailAddress").focus();
        }
    }).open();
}