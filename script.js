/* ============================================================
   NexGen Systems – script.js
   ============================================================ */

// ── Language Toggle ─────────────────────────────────────────
let currentLang = 'ar';

function toggleLang() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const body = document.body;
    const btn = document.getElementById('langToggle');

    if (currentLang === 'en') {
        body.classList.add('en');
        body.setAttribute('dir', 'ltr');
        body.setAttribute('lang', 'en');
        btn.textContent = 'ع';
    } else {
        body.classList.remove('en');
        body.setAttribute('dir', 'rtl');
        body.setAttribute('lang', 'ar');
        btn.textContent = 'EN';
    }

    // Update all data-* text nodes
    document.querySelectorAll('[data-ar]').forEach(el => {
        const key = currentLang === 'en' ? 'en' : 'ar';
        if (el.dataset[key]) el.textContent = el.dataset[key];
    });

    // Fix hero CTA icon direction
    updateIconDirections();
}

function updateIconDirections() {
    const arrows = document.querySelectorAll('.btn-primary i.fa-arrow-left, .btn-outline i.fa-arrow-left');
    arrows.forEach(icon => {
        icon.style.transform = currentLang === 'en' ? 'scaleX(-1)' : 'scaleX(1)';
    });
}

// ── Navbar Scroll ───────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// ── Active Nav Link Tracking ────────────────────────────────
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.id;
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}

// ── Mobile Menu ─────────────────────────────────────────────
function toggleMenu() {
    const links = document.getElementById('navLinks');
    const icon = document.querySelector('#mobileMenu i');
    links.classList.toggle('open');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
        const icon = document.querySelector('#mobileMenu i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ── Particles ───────────────────────────────────────────────
function createParticles() {
    const container = document.getElementById('particles');
    const count = 30;
    const colors = ['#00C6FF', '#0072FF', '#6C63FF', '#FF6B6B'];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 4 + 2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDuration = `${Math.random() * 20 + 12}s`;
        p.style.animationDelay = `${Math.random() * 15}s`;
        container.appendChild(p);
    }
}

// ── Counter Animation ───────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// ── Scroll Reveal ───────────────────────────────────────────
function setupReveal() {
    const revealEls = document.querySelectorAll(
        '.service-card, .product-card, .project-card, .why-card, .tech-item, .client-card, .section-header'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);

                // Trigger counters
                const counter = entry.target.querySelector('.stat-number[data-count]');
                if (counter) animateCounter(counter, parseInt(counter.dataset.count));
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

    // Counters in hero
    const heroStats = document.querySelectorAll('.hero-stats .stat-number[data-count]');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroStats.forEach(el => animateCounter(el, parseInt(el.dataset.count)));
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero-stats');
    if (heroSection) heroObserver.observe(heroSection);
}

// ── Product Filters ─────────────────────────────────────────
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    // Re-trigger animation
                    card.classList.remove('visible');
                    setTimeout(() => card.classList.add('visible'), 60);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ── Staggered Animation ─────────────────────────────────────
function staggerAnimations() {
    const grids = [
        '.services-grid .service-card',
        '.products-grid .product-card',
        '.projects-grid .project-card',
        '.why-grid .why-card',
        '.tech-grid .tech-item',
        '.clients-grid .client-card'
    ];

    grids.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.style.transitionDelay = `${i * 80}ms`;
        });
    });
}

// ── Smooth Scroll ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
    });
});

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupReveal();
    setupFilters();
    staggerAnimations();
});
