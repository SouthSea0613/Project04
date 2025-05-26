$(document).ready(function () {
    // --- 헤더 스크롤 축소 기능 ---
    const $header = $('header'); // header.html의 <header> 태그 선택
    const scrollThreshold = 50; // 헤더가 축소되기 시작하는 스크롤 Y 값 (px)

    // 스크롤 이벤트 핸들러
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > scrollThreshold) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

    // 페이지 로드 시 초기 스크롤 위치 확인 (새로고침 시 스크롤 위치 유지될 경우 대비)
    if ($(window).scrollTop() > scrollThreshold) {
        $header.addClass('scrolled');
    }
});