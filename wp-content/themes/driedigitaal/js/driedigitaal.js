document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on("scroll", () => {
    bootstrap.ScrollSpy.getInstance(document.body)?.refresh();
  });

  // Navbar hide on scroll down, show on scroll up
  const navbar = document.querySelector(".site-header");
  const navbarUtility = document.querySelector(".nav--utility");
  let lastScrollY = window.scrollY;
  let ticking = false;
  let hideTimeout = null;
  let showTimeout = null;
  let lastDirection = "up";

  function handleNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 4.5 * 16) {
      navbar.classList.add("site-header--scrolled");
      navbarUtility.classList.add("nav--utility--scrolled");
    } else {
      navbar.classList.remove("site-header--scrolled");
      navbarUtility.classList.remove("nav--utility--scrolled");
    }

    if (currentScrollY > lastScrollY && currentScrollY > 4.5 * 16) {
      if (lastDirection !== "down") {
        clearTimeout(showTimeout);
        navbar.classList.add("site-header--hidden");
        lastDirection = "down";
      }
    } else if (currentScrollY < lastScrollY) {
      if (lastDirection !== "up") {
        clearTimeout(hideTimeout);
        showTimeout = setTimeout(() => {
          navbar.classList.remove("site-header--hidden");
          lastDirection = "up";
        }, 150);
      }
    }
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleNavbar);
      ticking = true;
    }
  });

  handleNavbar();

  navbar.classList.remove("navbar--hidden");

  // mobile navbar toggle
  const navbarToggle = document.getElementById("navbar-toggle");
  const headerNav = document.getElementById("header-nav");

  navbarToggle.addEventListener("click", () => {
    navbarToggle.classList.toggle("open");

    const isOpen = headerNav.classList.toggle("open");

    if (isOpen) {
      lenis.stop(); // blokkeer scroll
    } else {
      lenis.start(); // activeer scroll
    }
  });

  const swiperEvents = new Swiper(".swiper--events", {
    navigation: true,
    slidesPerView: 1,
    spaceBetween: 4 * 16,
    easing: "ease-in-out",
    speed: 1000,
    loop: false,
    navigation: {
      nextEl: ".events__nav .swiper-button-next",
      prevEl: ".events__nav .swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 1.5,
        spaceBetween: 6 * 16,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 6 * 16,
      },
    },
  });
});
