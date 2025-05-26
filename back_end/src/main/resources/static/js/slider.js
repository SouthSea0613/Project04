document.addEventListener('DOMContentLoaded', function () {
    const sliderContainerElement = document.querySelector('.slider-container');
    const slidesWrapper = document.querySelector('.slides'); // 실제 슬라이드들을 감싸는 .slides div
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const indicatorsContainer = document.querySelector('.slide-indicators');

    // --- 슬라이더 설정 ---
    const images = [
        { src: '/images/employment_banner.png', alt: '취업 플랫폼 배너' },
        { src: '/images/interior_banner.png', alt: '인테리어 디자인 배너' },
        { src: '/images/map_banner.png', alt: '지도 서비스 배너' },
        // { src: '/images/new_banner_01.png', alt: '새로운 배너 1' },
    ];
    const autoSlideInterval = 5000;
    // --- 설정 끝 ---

    let currentSlideIndex = 0;
    let slideElements = [];
    let indicatorElements = [];
    let autoSlideTimer;
    let totalSlides = images.length;

    function initializeSlider() {
        if (!slidesWrapper || totalSlides === 0) {
            if (prevArrow) prevArrow.style.display = 'none';
            if (nextArrow) nextArrow.style.display = 'none';
            if (indicatorsContainer) indicatorsContainer.style.display = 'none';
            const sliderAspectRatioKeeper = document.querySelector('.slider-aspect-ratio-keeper');
            if(sliderAspectRatioKeeper && totalSlides === 0) {
                sliderAspectRatioKeeper.style.paddingTop = '0';
                sliderAspectRatioKeeper.style.backgroundColor = 'transparent';
            }
            console.warn('Slider not initialized: No images or slides wrapper found.');
            return;
        }

        slidesWrapper.innerHTML = '';
        if (indicatorsContainer) indicatorsContainer.innerHTML = '';
        slideElements = [];
        indicatorElements = [];

        // .slides 컨테이너의 전체 너비를 (이미지 개수 * 100%)로 설정
        // 여기서 100%는 .slider-container (또는 .slider-aspect-ratio-keeper)의 너비를 의미
        slidesWrapper.style.width = `${totalSlides * 100}%`;

        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            // 각 .slide 요소의 너비를 .slides 컨테이너 너비의 (1 / totalSlides) 만큼으로 설정
            // 이렇게 하면 각 슬라이드는 정확히 .slider-container의 너비만큼을 차지하게 됨
            slide.style.width = `${100 / totalSlides}%`;

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            // img 태그의 스타일은 CSS에서 .slide img 로 제어합니다.
            slide.appendChild(img);
            slidesWrapper.appendChild(slide);
            slideElements.push(slide);

            if (indicatorsContainer) {
                const dot = document.createElement('button');
                dot.classList.add('indicator-dot');
                dot.setAttribute('aria-label', `슬라이드 ${index + 1}로 이동`);
                if (index === 0) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetAutoSlide();
                });
                indicatorsContainer.appendChild(dot);
                indicatorElements.push(dot);
            }
        });

        updateSlidePosition();
        updateIndicators();
    }

    function updateSlidePosition() {
        if (!slidesWrapper) return;
        // .slides 컨테이너를 이동시킨다.
        // 이동 거리는 (현재 인덱스 * 각 슬라이드의 너비 비율)
        // 각 슬라이드의 너비 비율은 .slides 컨테이너 전체 너비에 대해 (100 / totalSlides)% 이다.
        slidesWrapper.style.transform = `translateX(-${currentSlideIndex * (100 / totalSlides)}%)`;
    }

    function goToSlide(index) {
        currentSlideIndex = (index + totalSlides) % totalSlides;
        updateSlidePosition();
        updateIndicators();
    }

    function updateIndicators() {
        if (indicatorsContainer) {
            indicatorElements.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentSlideIndex);
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

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    const sliderContainerForEvents = document.querySelector('.slider-container');
    if (sliderContainerForEvents) {
        sliderContainerForEvents.addEventListener('mouseenter', stopAutoSlide);
        sliderContainerForEvents.addEventListener('mouseleave', startAutoSlide);
    }

    initializeSlider();
    startAutoSlide();
});