/* ==========================================
   IronCub V3 — SPA Routing & Interactivity
   ========================================== */

/* ===== VIDEO LIGHTBOX (Global) ===== */
function openVideoLightbox(videoId) {
  const lb = document.getElementById('videoLightbox');
  const iframe = document.getElementById('videoIframe');
  if (lb && iframe) {
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoLightbox() {
  const lb = document.getElementById('videoLightbox');
  const iframe = document.getElementById('videoIframe');
  if (lb && iframe) {
    lb.classList.remove('active');
    iframe.src = '';
    document.body.style.overflow = '';
  }
}

/* Close lightbox on Escape */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeVideoLightbox();
});

document.addEventListener('DOMContentLoaded', function() {

  /* ===== SPA ROUTING ===== */
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('[data-nav]');
  const header = document.getElementById('header');

  function navigateTo(sectionId) {
    /* Hide all sections */
    sections.forEach(function(s) { s.classList.remove('active'); });

    /* Find target section */
    var target = document.querySelector('[data-section="' + sectionId + '"]');
    if (!target) target = document.querySelector('[data-section="hero"]');
    if (target) target.classList.add('active');

    /* Update active nav state */
    navLinks.forEach(function(link) {
      if (link.classList.contains('nav-link')) {
        link.classList.remove('nav-active');
        if (link.getAttribute('data-nav') === sectionId) {
          link.classList.add('nav-active');
        }
      }
    });

    /* Scroll to top */
    window.scrollTo(0, 0);

    /* Close mobile nav if open */
    closeMobileNav();

    /* Trigger scroll animations for newly visible section */
    setTimeout(function() { observeElements(); }, 100);
  }

  function handleHash() {
    var hash = window.location.hash.replace('#', '') || 'hero';
    navigateTo(hash);
  }

  /* Listen for hash changes */
  window.addEventListener('hashchange', handleHash);

  /* Handle nav clicks */
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = this.getAttribute('data-nav');
      if (target) {
        e.preventDefault();
        window.location.hash = target;
      }
    });
  });

  /* Initial route */
  handleHash();

  /* ===== MOBILE NAV ===== */
  var mobileToggle = document.getElementById('mobileToggle');
  var mobileOverlay = document.getElementById('mobileOverlay');

  function closeMobileNav() {
    if (mobileToggle) mobileToggle.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      var isOpen = this.classList.toggle('active');
      if (mobileOverlay) mobileOverlay.classList.toggle('open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    });
  }

  /* Mobile dropdown triggers */
  var ddTriggers = document.querySelectorAll('.mobile-dd-trigger');
  ddTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      this.classList.toggle('open');
      var content = this.nextElementSibling;
      if (content) content.classList.toggle('open');
    });
  });

  /* Close mobile nav on link click */
  var mobileLinks = document.querySelectorAll('.mob-link');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMobileNav();
    });
  });

  /* ===== HEADER SCROLL EFFECT ===== */
  var lastScrollY = 0;
  window.addEventListener('scroll', function() {
    var currentY = window.scrollY;
    if (header) {
      if (currentY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    lastScrollY = currentY;
  });

  /* ===== AANBOUWDELEN TABS ===== */
  var tabs = document.querySelectorAll('.att-tab');
  var attCards = document.querySelectorAll('.att-card');

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var cat = this.dataset.cat;

      tabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      attCards.forEach(function(card) {
        if (cat === 'all' || card.dataset.category === cat) {
          card.classList.remove('att-hidden');
        } else {
          card.classList.add('att-hidden');
        }
      });
    });
  });

  /* ===== SCROLL ANIMATIONS ===== */
  var animObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-in');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeElements() {
    var animElements = document.querySelectorAll('[data-anim]:not(.anim-in)');
    animElements.forEach(function(el) {
      animObserver.observe(el);
    });
  }

  observeElements();

  /* Inject animation styles */
  var style = document.createElement('style');
  style.textContent = [
    '[data-anim] { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }',
    '[data-anim].anim-in { opacity: 1; transform: translateY(0); }',
    '[data-anim]:nth-child(2) { transition-delay: .1s; }',
    '[data-anim]:nth-child(3) { transition-delay: .2s; }',
    '[data-anim]:nth-child(4) { transition-delay: .3s; }',
    '[data-anim]:nth-child(5) { transition-delay: .4s; }'
  ].join('\n');
  document.head.appendChild(style);

  /* ===== FORM HANDLING =====
     Contactformulier handler is verplaatst naar contact.html zelf,
     omdat die de echte POST naar /api/contact doet. Deze stub stond
     hier als fake 'Verzonden!' en veroorzaakte een race met de echte
     handler. Bewust verwijderd. */

  /* ===== DROPDOWN HOVER (Desktop) ===== */
  var dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(function(dd) {
    var timeout;
    dd.addEventListener('mouseenter', function() {
      clearTimeout(timeout);
      this.querySelector('.dropdown-menu').style.display = 'block';
    });
    dd.addEventListener('mouseleave', function() {
      var menu = this.querySelector('.dropdown-menu');
      timeout = setTimeout(function() {
        menu.style.display = '';
      }, 200);
    });
  });

});
