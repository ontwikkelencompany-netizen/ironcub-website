/* ============================================
   THE IRONCUB COMPANY — App JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- Theme (default: light for this industrial brand) ---- */
  const html = document.documentElement;
  html.setAttribute('data-theme', 'light');

  /* ---- Mobile Navigation ---- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.nav-mobile');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Menu openen' : 'Menu sluiten');
      mobileNav.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Menu openen');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Header scroll behavior ---- */
  const header = document.querySelector('.site-header');
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    if (scrollY > 80) {
      header.style.boxShadow = '0 1px 8px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Hide on scroll down, show on scroll up
    if (scrollY > 300) {
      if (scrollY > lastScrollY + 5) {
        header.classList.add('site-header--hidden');
      } else if (scrollY < lastScrollY - 5) {
        header.classList.remove('site-header--hidden');
      }
    } else {
      header.classList.remove('site-header--hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  /* ---- Scroll Reveal (Intersection Observer) ---- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  /* ---- Smooth Scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Counter Animation ---- */
  function animateCounters() {
    const stats = document.querySelectorAll('.stat-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const match = text.match(/^([\d,.]+)/);
          
          if (match) {
            const endVal = parseFloat(match[1].replace(/[.,]/g, ''));
            const suffix = text.replace(match[1], '');
            const duration = 1500;
            const startTime = performance.now();
            
            function step(currentTime) {
              const progress = Math.min((currentTime - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(endVal * eased);
              
              el.textContent = current.toLocaleString('nl-NL') + suffix;
              
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            }
            
            requestAnimationFrame(step);
          }
          
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(stat => counterObserver.observe(stat));
  }

  animateCounters();

  /* ---- Form Handler ---- */
  window.handleSubmit = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Verstuurd!';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      e.target.reset();
    }, 3000);
  };

  /* ---- Active nav highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.color = '#fff';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNav();
      });
    }
  }, { passive: true });

})();
