/**
 * Gemilang Katun Outbound - Main Script
 * All interactive features are handled via client-side JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.querySelector('.navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const navToggle = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('.navbar-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ==========================================
  // SCROLL TO TOP BUTTON
  // ==========================================
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // FADE-IN ANIMATION ON SCROLL
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(function(el) {
      fadeObserver.observe(el);
    });
  }

  // ==========================================
  // GALLERY LIGHTBOX
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');

  if (lightbox && galleryItems.length > 0) {
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');

      // Close all others
      faqQuestions.forEach(function(otherBtn) {
        otherBtn.classList.remove('active');
        otherBtn.nextElementSibling.classList.remove('open');
      });

      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  // ==========================================
  // TOC TOGGLE
  // ==========================================
  const tocToggle = document.querySelector('.toc-toggle');
  const tocList = document.querySelector('.toc-list');

  if (tocToggle && tocList) {
    tocToggle.classList.add('active');
    tocList.style.display = 'block';

    tocToggle.addEventListener('click', function() {
      tocToggle.classList.toggle('active');
      if (tocList.style.display === 'none') {
        tocList.style.display = 'block';
      } else {
        tocList.style.display = 'none';
      }
    });
  }

  // ==========================================
  // AUTO GENERATE TOC
  // ==========================================
  const articleContent = document.querySelector('.article-content');
  const tocListEl = document.getElementById('toc-list');

  if (articleContent && tocListEl) {
    const headings = articleContent.querySelectorAll('h2, h3');
    headings.forEach(function(heading, index) {
      const id = 'section-' + index;
      heading.setAttribute('id', id);

      const li = document.createElement('li');
      li.className = heading.tagName === 'H3' ? 'toc-h3' : 'toc-h2';

      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = heading.textContent;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });

      li.appendChild(a);
      tocListEl.appendChild(li);
    });
  }

  // ==========================================
  // SHARE BUTTONS
  // ==========================================
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl = '';

      if (btn.classList.contains('wa')) {
        shareUrl = 'https://wa.me/?text=' + title + '%20' + url;
      } else if (btn.classList.contains('fb')) {
        shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
      } else if (btn.classList.contains('tw')) {
        shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
      } else if (btn.classList.contains('li')) {
        shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
      } else if (btn.classList.contains('tg')) {
        shareUrl = 'https://t.me/share/url?url=' + url + '&text=' + title;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });

  // ==========================================
  // WHATSAPP LINK HANDLER
  // ==========================================
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      // Link will naturally open WhatsApp
    });
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count')) || 0;
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = Math.ceil(target / 60);
          const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current.toLocaleString('id-ID') + suffix;
          }, 20);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function(el) {
      counterObserver.observe(el);
    });
  }
});
