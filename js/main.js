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