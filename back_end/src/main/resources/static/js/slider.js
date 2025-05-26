$(document).ready(function () {
    const $sliderContainerElement = $('.slider-container');
    const $slidesWrapper = $('.slides');
    const $prevArrow = $('.prev-arrow');
    const $nextArrow = $('.next-arrow');
    const $indicatorsContainer = $('.slide-indicators');

    // --- 슬라이더 설정 ---
    const images = [
        { src: '/images/employment_banner.png', alt: '취업 플랫폼 배너', link: '/employment' }, // 예시 링크 추가
        { src: '/images/interior_banner.png', alt: '인테리어 디자인 배너', link: '/inspirations' }, // 예시 링크 추가
        { src: '/images/map_banner.png', alt: '지도 서비스 배너', link: '/map' }, // 예시 링크 추가
        // --- 추후 이미지 추가는 이 배열에 객체 형태로 추가 ---
        // { src: '/images/new_banner_01.png', alt: '새로운 배너 1', link: '/new-service' },
    ];
    const autoSlideInterval = 5000;
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

        $slidesWrapper.empty();
        if ($indicatorsContainer.length) $indicatorsContainer.empty();

        $slidesWrapper.css('width', `${totalSlides * 100}%`);

        $.each(images, function (index, imageInfo) { // 변수명을 imageInfo로 변경하여 명확성 증가
            const $slide = $('<div>').addClass('slide');
            $slide.css('width', `${100 / totalSlides}%`);

            const $img = $('<img>').attr({
                src: imageInfo.src,
                alt: imageInfo.alt
                // 이미지 자체에는 클릭 이벤트를 직접 걸지 않음
            });

            // 이미지를 <a> 태그로 감싸서 링크 기능 추가
            const $anchor = $('<a>').attr('href', imageInfo.link || '#'); // link가 없으면 기본 '#'으로 이동
            // 새 창에서 열고 싶다면: $anchor.attr('target', '_blank');

            $anchor.append($img); // 앵커 태그 안에 이미지 삽입
            $slide.append($anchor); // 슬라이드 안에 앵커 태그(이미지 포함) 삽입
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
            stopAutoSlide();
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

    if ($sliderContainerElement.length) {
        $sliderContainerElement.on('mouseenter', stopAutoSlide);
        $sliderContainerElement.on('mouseleave', startAutoSlide);
    }

    initializeSlider();
    startAutoSlide();
});