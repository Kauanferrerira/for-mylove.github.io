function calculateTimeTogether() {
    const startDate = new Date('2024-10-06');
    const now = new Date();
    
    const timeDiff = now - startDate;
    
    // Cálculos para cada unidade de tempo
    const daysTogether = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursTogether = Math.floor(timeDiff / (1000 * 60 * 60));
    
    // Para o contador detalhado
    const days = daysTogether;
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // Atualizar os cards de estatísticas
    document.getElementById('daysTogether').textContent = daysTogether;
    document.getElementById('hoursTogether').textContent = hoursTogether;
    
    // Atualizar o contador detalhado
    document.getElementById('daysCount').textContent = days;
    document.getElementById('hoursCount').textContent = hours;
    document.getElementById('minutesCount').textContent = minutes;
    document.getElementById('secondsCount').textContent = seconds;
}

// Carousel functionality
function setupCarousel() {
    const carousel = document.getElementById('carouselMain');
    const slides = carousel.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Time between auto slides (5 seconds)
    
    // Create indicator dots
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    // Get all indicators
    const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        currentSlide = slideIndex;
        
        // Handle wrap-around
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        } else if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Auto slide (start)
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // Auto slide (stop)
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });
    
    // Also stop slideshow when hovering over carousel
    carousel.addEventListener('mouseenter', stopSlideShow);
    carousel.addEventListener('mouseleave', startSlideShow);
    
    // Start the slideshow
    startSlideShow();
}

// Calculate time on page load
document.addEventListener('DOMContentLoaded', function() {
    calculateTimeTogether();
    
    // Atualizar a cada segundo para o contador detalhado
    setInterval(calculateTimeTogether, 1000);
    
    // Initialize carousel
    setupCarousel();
});