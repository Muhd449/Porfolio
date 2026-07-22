/* =========================================================
   TABLE OF CONTENTS
   1. Preloader
   2. Custom Cursor
   3. Scroll Progress Bar
   4. Navbar Scroll + Active Link Highlight
   5. Mobile Hamburger Menu
   6. Typed.js Typing Animation
   7. Particles.js Background
   8. AOS Init
   9. Skill Bars Animation (on scroll)
   10. Animated Statistics Counter
   11. Project Filter
   12. Button Ripple Effect
   13. Theme Toggle (Light/Dark)
   14. Back To Top Button
   15. Contact Form (demo submit handler)
   16. Footer Year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 400);
  });

  /* ---------- 2. CUSTOM CURSOR ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorOutline.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 300, fill: 'forwards' }
      );
    });

    document.querySelectorAll('a, button, .filter-btn, .project-card, input, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
    });
  }

  /* ---------- 3. SCROLL PROGRESS BAR ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  };

  /* ---------- 4. NAVBAR SCROLL + ACTIVE LINK ---------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    updateScrollProgress();

    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 500);

    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- 5. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navLinksList.classList.toggle('active');
  };

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') toggleMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksList.classList.remove('active');
    });
  });

  /* ---------- 6. TYPED.JS TYPING ANIMATION ---------- */
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: ['Data Analyst', 'Insight Builder', 'Dashboard Designer', 'Storyteller with Data'],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: false
    });
  }

  /* ---------- 7. PARTICLES.JS BACKGROUND ---------- */
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: ['#3B82F6', '#8B5CF6', '#06B6D4'] },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#3B82F6',
          opacity: 0.15,
          width: 1
        },
        move: { enable: true, speed: 1.2, out_mode: 'out' }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' }
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ---------- 8. AOS INIT ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- 9. SKILL BARS ANIMATION ON SCROLL ---------- */
  const skillFills = document.querySelectorAll('.fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = `${entry.target.dataset.width}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach((fill) => skillObserver.observe(fill));

  /* ---------- 10. ANIMATED STATISTICS COUNTER ---------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const increment = Math.max(target / 60, 1);

      const update = () => {
        current += increment;
        if (current < target) {
          el.textContent = Math.ceil(current);
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      };
      update();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => counterObserver.observe(counter));

  /* ---------- 11. PROJECT FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const categories = card.dataset.category.split(' ');
        const show = filter === 'all' || categories.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ---------- 12. BUTTON RIPPLE EFFECT ---------- */
  document.querySelectorAll('.ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      circle.classList.add('ripple-circle');
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  /* ---------- 13. THEME TOGGLE (LIGHT/DARK) ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const savedTheme = localStorageSafeGet('portfolio-theme');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.className = 'fa-solid fa-moon';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.className = 'fa-solid fa-sun';
    }
  };

  applyTheme(savedTheme || 'dark');

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorageSafeSet('portfolio-theme', newTheme);
  });

  // Safe wrappers in case localStorage is unavailable (e.g. sandboxed preview)
  function localStorageSafeGet(key) {
    try { return localStorage.getItem(key); } catch (err) { return null; }
  }
  function localStorageSafeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (err) { /* no-op */ }
  }

  /* ---------- 14. BACK TO TOP BUTTON ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 15. CONTACT FORM (DEMO HANDLER) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Placeholder handler: replace with a real backend, form service
    // (e.g. Formspree, EmailJS) or fetch() call to your API.
    formNote.textContent = 'Thanks! Your message has been noted (demo only — connect a backend to send it for real).';
    contactForm.reset();
    setTimeout(() => { formNote.textContent = ''; }, 5000);
  });

  /* ---------- 16. FOOTER YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});