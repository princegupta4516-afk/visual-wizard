/* ========== VISUAL WIZARD - CINEMATIC PORTFOLIO JS ========== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== LOADING SCREEN ===== */
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 700);
    }, 2200);
  }

  /* ===== CURSOR GLOW ===== */
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  /* ===== NAVBAR ===== */
  const navbar = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  // Active link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ===== PARTICLES ===== */
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${Math.random() * 0.5 + 0.1};
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ===== HERO SLIDER ===== */
  const heroSlides = [
    {
      label: 'Creative Director & Visual Storyteller',
      title: 'STORIES THAT\nMOVE &\n<span class="highlight">INSPIRE.</span>',
      desc: 'Crafting cinematic worlds, breathtaking animations, and visual stories that transcend the boundaries of imagination.',
      img: 'https://images.pexels.com/photos/29773028/pexels-photo-29773028.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      badge: '✦ Available for Projects'
    },
    {
      label: 'Animator & Filmmaker',
      title: 'VISUAL\nUNIVERSES\n<span class="highlight">UNLEASHED.</span>',
      desc: 'From concept to screen — transforming raw ideas into stunning animated masterpieces with cinematic precision.',
      img: 'https://images.pexels.com/photos/20009319/pexels-photo-20009319.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      badge: '✦ Open to Collaboration'
    },
    {
      label: 'Motion Designer & VFX Artist',
      title: 'WHERE ART\nMEETS\n<span class="highlight">TECHNOLOGY.</span>',
      desc: 'Blending artistic vision with technical mastery to create immersive experiences that leave lasting impressions.',
      img: 'https://images.pexels.com/photos/8107826/pexels-photo-8107826.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      badge: '✦ Let\'s Create Together'
    }
  ];

  let currentSlide = 0;
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const heroLabel = document.getElementById('hero-label');
  const heroImg = document.getElementById('hero-img');
  const heroBadge = document.getElementById('hero-badge');
  const dots = document.querySelectorAll('.slider-dot');

  function updateSlide(index) {
    if (!heroTitle) return;
    const slide = heroSlides[index];
    heroTitle.innerHTML = slide.title.replace(/\n/g, '<br>');
    heroDesc.textContent = slide.desc;
    heroLabel.innerHTML = `<span class="label-dot"></span>${slide.label}`;
    heroImg.src = slide.img;
    if (heroBadge) heroBadge.innerHTML = `<span>${slide.badge}</span>`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateSlide(currentSlide);
    });
  });

  const prevArrow = document.getElementById('hero-prev');
  const nextArrow = document.getElementById('hero-next');
  if (prevArrow) prevArrow.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    updateSlide(currentSlide);
  });
  if (nextArrow) nextArrow.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateSlide(currentSlide);
  });

  let autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateSlide(currentSlide);
  }, 5000);

  /* ===== SCROLL ANIMATIONS ===== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Skill bars
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        // Stats counter
        entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
          animateCounter(el);
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.anim-fadeup').forEach(el => observer.observe(el));
  document.querySelectorAll('.skill-item, .stats-grid').forEach(el => observer.observe(el));

  /* ===== COUNTER ANIMATION ===== */
  function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  /* ===== PORTFOLIO FILTER ===== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card[data-cat]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      portfolioCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ===== CASE STUDY SLIDER ===== */
  const caseSlides = document.querySelectorAll('.case-slide');
  const caseDots = document.querySelectorAll('.case-dot');
  let currentCase = 0;

  function showCase(index) {
    caseSlides.forEach((s, i) => s.classList.toggle('active', i === index));
    caseDots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  document.getElementById('case-prev')?.addEventListener('click', () => {
    currentCase = (currentCase - 1 + caseSlides.length) % caseSlides.length;
    showCase(currentCase);
  });
  document.getElementById('case-next')?.addEventListener('click', () => {
    currentCase = (currentCase + 1) % caseSlides.length;
    showCase(currentCase);
  });
  caseDots.forEach((dot, i) => dot.addEventListener('click', () => {
    currentCase = i;
    showCase(currentCase);
  }));

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-question').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      // Open clicked
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        hamburger?.classList.remove('open');
        mobileMenu?.classList.remove('open');
      }
    });
  });

});
		const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});
