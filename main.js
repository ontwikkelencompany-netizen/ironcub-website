/* ================================================================
   THE IRONCUB COMPANY — Main JavaScript
   ================================================================ */

(function () {
  'use strict';

  // === MOBILE NAV ===
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function closeMobileNav() {
    mobileToggle.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.contains('active');
      if (isOpen) {
        closeMobileNav();
      } else {
        mobileToggle.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // === HEADER SCROLL EFFECT ===
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;

    // Add/remove scrolled class for visual treatment
    if (scrollY > 50) {
      header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
      header.style.background = 'rgba(26, 26, 26, 0.95)';
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // === SCROLL REVEAL ===
  const revealElements = document.querySelectorAll(
    '.section-header, .product-card, .attachment-card, .showroom-info, .showroom-gallery, .about-text, .about-image, .mascot-card, .social-links, .contact-info, .contact-form, .feature'
  );

  // Add reveal class to elements
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el, i) => {
    // Stagger animations slightly
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 80}ms`;
    observer.observe(el);
  });

  // === CONTACT FORM ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Show success message
      contactForm.innerHTML = `
        <div class="form-success">
          <h3>Bedankt!</h3>
          <p>We hebben uw bericht ontvangen en nemen zo snel mogelijk contact met u op.</p>
        </div>
      `;
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === ACTIVE NAV HIGHLIGHT ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = '#D4A04A';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

})();
