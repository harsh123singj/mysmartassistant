  const originalNavbar = document.querySelector('.original-navbar');
  const scrolledNavbar = document.querySelector('.scrolled-navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // user scrolled down
      originalNavbar.style.display = 'none';
      scrolledNavbar.style.display = 'flex'; // show scrolled navbar
    } else { // back to top
      originalNavbar.style.display = 'flex'; // show original
      scrolledNavbar.style.display = 'none'; // hide scrolled navbar
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


  // FAQ toggle
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const answer = item.querySelector(".faq-answer");

      item.classList.toggle("active");

      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // Load more
  document.getElementById("loadMoreBtn").addEventListener("click", function () {
    document.querySelectorAll(".faq-item.d-none").forEach(item => {
      item.classList.remove("d-none");
    });
    this.style.display = "none";
  });
