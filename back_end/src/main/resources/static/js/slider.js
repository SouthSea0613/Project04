$(document).ready(function () {
    const $sliderContainerElement = $('.slider-container');
    const $slidesWrapper = $('.slides'); // 실제 슬라이드들을 감싸는 .slides div
    const $prevArrow = $('.prev-arrow');
    const $nextArrow = $('.next-arrow');
    const $indicatorsContainer = $('.slide-indicators');

    // --- 슬라이더 설정 ---
    const images = [
        { src: '/images/employment_banner.png', alt: '취업 플랫폼 배너' },
        { src: '/images/interior_banner.png', alt: '인테리어 디자인 배너' },
        { src: '/images/map_banner.png', alt: '지도 서비스 배너' },
        // --- 추후 이미지 추가는 이 배열에 객체 형태로 추가 ---
        // { src: '/images/new_banner_01.png', alt: '새로운 배너 1' },
    ];
    const autoSlideInterval = 5000; // 자동 회전 간격 (밀리초 단위, 5초)
    // --- 설정 끝 ---

    let currentSlideIndex = 0;
    let autoSlideTimer;
    const totalSlides = images.length;

    function initializeSlider() {
        if (!$slidesWrapper.length || totalSlides === 0) {
            if ($prevArrow.length) $prevArrow.hide();
            if ($nextArrow.length) $nextArrow.hide();
            if ($indicatorsContainer.length) $indicatorsContainer.hide();
            const $sliderAspectRatioKeeper = $('.slider-aspect-ratio-keeper');
            if($sliderAspectRatioKeeper.length && totalSlides === 0) {
                $sliderAspectRatioKeeper.css({ 'padding-top': '0', 'background-color': 'transparent' });
            }
            console.warn('Slider not initialized: No images or slides wrapper found.');
            return;
        }

        $slidesWrapper.empty(); // 기존 슬라이드 초기화
        if ($indicatorsContainer.length) $indicatorsContainer.empty(); // 기존 인디케이터 초기화

        // .slides 컨테이너의 전체 너비를 (이미지 개수 * 100%)로 설정
        $slidesWrapper.css('width', `${totalSlides * 100}%`);

        $.each(images, function (index, image) {
            const $slide = $('<div>').addClass('slide');
            // 각 .slide 요소의 너비를 .slides 컨테이너 너비의 (1 / totalSlides) 만큼으로 설정
            $slide.css('width', `${100 / totalSlides}%`);

            const $img = $('<img>').attr({
                src: image.src,
                alt: image.alt
            });
            $slide.append($img);
            $slidesWrapper.append($slide);

            if ($indicatorsContainer.length) {
                const $dot = $('<button>').addClass('indicator-dot')
                    .attr('aria-label', `슬라이드 ${index + 1}로 이동`);
                if (index === 0) {
                    $dot.addClass('active');
                }
                $dot.on('click', function () {
                    goToSlide(index);
                    resetAutoSlide();
                });
                $indicatorsContainer.append($dot);
            }
        });

        updateSlidePosition();
        updateIndicators();
    }

    function updateSlidePosition() {
        if (!$slidesWrapper.length) return;
        // .slides 컨테이너를 이동시킨다.
        // 이동 거리는 (현재 인덱스 * 각 슬라이드의 너비 비율)
        // 각 슬라이드의 너비 비율은 .slides 컨테이너 전체 너비에 대해 (100 / totalSlides)% 이다.
        $slidesWrapper.css('transform', `translateX(-${currentSlideIndex * (100 / totalSlides)}%)`);
    }

    function goToSlide(index) {
        currentSlideIndex = (index + totalSlides) % totalSlides;
        updateSlidePosition();
        updateIndicators();
    }

    function updateIndicators() {
        if ($indicatorsContainer.length) {
            $indicatorsContainer.children('.indicator-dot').each(function (idx) {
                $(this).toggleClass('active', idx === currentSlideIndex);
            });
        }
    }

    function nextSlide() {
        goToSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentSlideIndex - 1);
    }

    function startAutoSlide() {
        if (autoSlideInterval > 0 && totalSlides > 1) {
            stopAutoSlide(); // 기존 타이머가 있다면 중지
            autoSlideTimer = setInterval(nextSlide, autoSlideInterval);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideTimer);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // 이벤트 리스너 등록
    if ($nextArrow.length) {
        $nextArrow.on('click', function () {
            nextSlide();
            resetAutoSlide();
        });
    }

    if ($prevArrow.length) {
        $prevArrow.on('click', function () {
            prevSlide();
            resetAutoSlide();
        });
    }

    // 슬라이더에 마우스 올리면 자동 회전 중지, 벗어나면 다시 시작
    if ($sliderContainerElement.length) {
        $sliderContainerElement.on('mouseenter', stopAutoSlide);
        $sliderContainerElement.on('mouseleave', startAutoSlide);
    }

    // 슬라이더 초기화 및 자동 슬라이드 시작
    initializeSlider();
    startAutoSlide();
});