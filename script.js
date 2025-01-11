function toggleMenu() {
    const hamburger = document.querySelector('.header__hamburger');
    const menu = document.querySelector('.header__menu');

    hamburger.classList.toggle('active'); 
    menu.classList.toggle('open');         
}

window.onscroll = function () {
    const backToTopButton = document.getElementById('back-to-top');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.opacity = "1";
        backToTopButton.style.pointerEvents = "auto";
    } else {
        backToTopButton.style.opacity = "0";
        backToTopButton.style.pointerEvents = "none";
    }
};

const scrollButton = document.querySelector('#back-to-top');

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('.gift-section__tabs a').forEach(tab => {
    tab.addEventListener('click', function(event) {
        event.preventDefault();
        
        const category = this.getAttribute('data-category');
        
        const cards = document.querySelectorAll('.best-gifts-card');
        
        cards.forEach(card => {
            if (category === 'all' || card.classList.contains(`for-${category}`)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none'; 
            }
        });
    });
});
const daysElement = document.querySelector('.cta-section__countdown-days');
const hoursElement = document.querySelector('.cta-section__countdown-hours');
const minutesElement = document.querySelector('.cta-section__countdown-minutes');
const secondsElement = document.querySelector('.cta-section__countdown-seconds');

function updateCountdown() {
    const now = new Date();
    const newYear = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1));
    const remainingTime = newYear - now;

    daysElement.textContent = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    hoursElement.textContent = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    minutesElement.textContent = Math.floor((remainingTime / (1000 * 60)) % 60);
    secondsElement.textContent = Math.floor((remainingTime / 1000) % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-section__container');
    const leftArrow = document.querySelector('.arrow-icon--left');
    const rightArrow = document.querySelector('.arrow-icon--right');
    const visibleAreaWidth = document.querySelector('.slider-section').offsetWidth;
    let currentOffset = 0, moveStep, maxOffset;

    function calculateSliderParameters() {
        const sliderTotalWidth = sliderContainer.scrollWidth;
        const screenWidth = window.innerWidth;
        const numberOfClicks = screenWidth >= 769 ? 3 : screenWidth >= 380 ? 6 : 9;
        moveStep = (sliderTotalWidth - visibleAreaWidth) / numberOfClicks;
        maxOffset = sliderTotalWidth - visibleAreaWidth;
        resetSlider();
    }

    function resetSlider() {
        currentOffset = 0;
        sliderContainer.style.transform = `translateX(0px)`;
        updateArrowStates();
    }

    function updateArrowStates() {
        leftArrow.style.pointerEvents = currentOffset === 0 ? 'none' : 'auto';
        leftArrow.style.opacity = currentOffset === 0 ? '0.5' : '1';
        rightArrow.style.pointerEvents = currentOffset >= maxOffset ? 'none' : 'auto';
        rightArrow.style.opacity = currentOffset >= maxOffset ? '0.5' : '1';
    }

    leftArrow.addEventListener('click', () => {
        if (currentOffset > 0) {
            currentOffset = Math.max(currentOffset - moveStep, 0);
            sliderContainer.style.transform = `translateX(-${currentOffset}px)`;
            sliderContainer.style.transition = 'transform 0.4s ease';
        }
        updateArrowStates();
    });

    rightArrow.addEventListener('click', () => {
        if (currentOffset < maxOffset) {
            currentOffset = Math.min(currentOffset + moveStep, maxOffset);
            sliderContainer.style.transform = `translateX(-${currentOffset}px)`;
            sliderContainer.style.transition = 'transform 0.4s ease';
        }
        updateArrowStates();
    });

    window.addEventListener('resize', calculateSliderParameters);
    calculateSliderParameters();
});
