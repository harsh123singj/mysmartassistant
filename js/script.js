/* =========================================
   1. NAVBAR & VIDEO PLAYER
   ========================================= */
const navbar = document.getElementById('mainNav');
const tryFreeBtn = document.getElementById('tryFreeBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        tryFreeBtn.classList.remove('d-none');
        tryFreeBtn.classList.add('d-block');
    } else {
        navbar.classList.remove('scrolled');
        tryFreeBtn.classList.add('d-none');
        tryFreeBtn.classList.remove('d-block');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Main Video
    const videoContainer = document.querySelector('.video-container');
    const mainVideo = document.getElementById('mainVideo');
    if (videoContainer && mainVideo) {
        videoContainer.addEventListener('click', () => {
            mainVideo.style.opacity = 1;
            mainVideo.play();
            videoContainer.querySelector('.video-cover').style.opacity = 0;
            videoContainer.querySelector('.play-btn-wrapper').style.opacity = 0;
        });
    }

    // Initialize Pricing (Default: Yearly)
    switchPricing('yearly');
});

/* =========================================
   2. PRICING TOGGLE LOGIC (Monthly vs Annual)
   ========================================= */
function switchPricing(mode) {
    const btnMonthly = document.getElementById('btnMonthly');
    const btnYearly = document.getElementById('btnYearly');

    // Price Numbers
    const pBasic = document.getElementById('priceBasic');
    const pSilver = document.getElementById('priceSilver');
    const pGold = document.getElementById('priceGold');

    // Old Price Strikethrough
    const oldBasic = document.getElementById('oldPriceBasic');
    const oldSilver = document.getElementById('oldPriceSilver');
    const oldGold = document.getElementById('oldPriceGold');

    // Total Cost Text
    const totBasic = document.getElementById('totalBlockBasic');
    const totSilver = document.getElementById('totalBlockSilver');
    const totGold = document.getElementById('totalBlockGold');

    if (mode === 'yearly') {
        // Active Button
        btnMonthly.classList.remove('active');
        btnYearly.classList.add('active');

        // Annual Prices (Divided by 12)
        pBasic.innerText = '42';
        oldBasic.innerHTML = '₹160/month';
        totBasic.innerHTML = `12 months for <span class="text-decoration-line-through text-secondary">₹1919</span> <span class="text-white fw-bold">₹499</span>`;

        pSilver.innerText = '83';
        oldSilver.innerHTML = '₹297/month';
        totSilver.innerHTML = `12 months for <span class="text-decoration-line-through text-secondary">₹3568</span> <span class="text-white fw-bold">₹999</span>`;

        pGold.innerText = '208';
        oldGold.innerHTML = '₹991/month';
        totGold.innerHTML = `12 months for <span class="text-decoration-line-through text-secondary">₹11900</span> <span class="text-white fw-bold">₹2499</span>`;

    } else {
        // Active Button
        btnYearly.classList.remove('active');
        btnMonthly.classList.add('active');

        // Monthly Prices (Full)
        pBasic.innerText = '160';
        oldBasic.innerHTML = '';
        totBasic.innerHTML = '<span class="text-white">Billed Monthly</span>';

        pSilver.innerText = '297';
        oldSilver.innerHTML = '';
        totSilver.innerHTML = '<span class="text-white">Billed Monthly</span>';

        pGold.innerText = '991';
        oldGold.innerHTML = '';
        totGold.innerHTML = '<span class="text-white">Billed Monthly</span>';
    }
}

/* =========================================
   3. BACKGROUND DOTS GENERATOR (Denser Starfield)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Create the container dynamically if it doesn't exist
    let dotContainer = document.getElementById('dot-container');
    if (!dotContainer) {
        dotContainer = document.createElement('div');
        dotContainer.id = 'dot-container';
        const landing = document.querySelector('.landing-container');
        if (landing) landing.insertBefore(dotContainer, landing.firstChild);
    }

    const colors = ['#8b5cf6', '#22d3ee', '#ca1aed', '#52cd6c', '#0e9cdc'];

    // INCREASED FROM 50 TO 200 FOR A FULL STARFIELD EFFECT
    for (let i = 0; i < 200; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 3 + 1; // Slightly smaller average size for "stars"
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;

        dot.style.left = `${left}%`;
        dot.style.top = `${top}%`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.backgroundColor = color;
        dot.style.boxShadow = `0 0 8px 1px ${color}`; // Slightly tighter glow
        dot.style.animationDuration = `${duration}s`;
        dot.style.animationDelay = `${delay}s`;

        dotContainer.appendChild(dot);
    }
});

/* =========================================
   TESTIMONIAL SLIDER - SEAMLESS INFINITE LOOP
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonialTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Configuration
    let currentIndex = 0;
    const totalRealCards = 8; // We have 8 unique people
    let isTransitioning = false;

    // Helper to get card width
    function getCardWidth() {
        return cards[0].offsetWidth + 20; // Width + Gap
    }

    // Main Move Function
    function moveSlider() {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    }

    // The Logic: Next Button
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        moveSlider();
        resetTimer();
    });

    // The Logic: Prev Button
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        moveSlider();
        resetTimer();
    });

    // Handle the "Jump" when transition ends
    track.addEventListener('transitionend', () => {
        isTransitioning = false;

        // If we scrolled past the last real card to the clone...
        if (currentIndex >= totalRealCards) {
            track.style.transition = 'none'; // Disable animation for instant jump
            currentIndex = 0; // Jump to start
            track.style.transform = `translateX(0px)`;
        }

        // If we went backward from start...
        if (currentIndex < 0) {
            track.style.transition = 'none';
            currentIndex = totalRealCards - 1; // Jump to end
            track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
        }
    });

    // Auto Slide
    let autoSlideInterval;
    function startTimer() {
        autoSlideInterval = setInterval(() => {
            if (!isTransitioning) {
                isTransitioning = true;
                currentIndex++;
                moveSlider();
            }
        }, 4000);
    }
    function resetTimer() {
        clearInterval(autoSlideInterval);
        startTimer();
    }

    startTimer();

    // Resize Handler
    window.addEventListener('resize', () => {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    });
});

/* =========================================
   FAQ LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');

        header.addEventListener('click', () => {
            const body = item.querySelector('.faq-body');
            const isActive = item.classList.contains('active');

            // 1. Close ALL others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-body').style.maxHeight = null;
                }
            });

            // 2. Toggle CURRENT
            if (isActive) {
                item.classList.remove('active');
                body.style.maxHeight = null;
            } else {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // LOAD MORE
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenFaqs = document.querySelector('.hidden-faqs');

    if (loadMoreBtn && hiddenFaqs) {
        loadMoreBtn.addEventListener('click', () => {
            hiddenFaqs.classList.remove('d-none'); // Show items
            loadMoreBtn.style.display = 'none';    // Hide button
        });
    }
});