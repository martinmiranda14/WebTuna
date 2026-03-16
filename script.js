// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Scroll Reveal Animation =====
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.history-content, .history-image, .timeline-item, .award-card, ' +
        '.member-card, .instrument-card, .genre-tag, .gallery-item, .contact-card, ' +
        '.repertoire, .awards-intro, .contact-map'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ===== Lightbox Gallery =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const captionEl = item.querySelector('.gallery-caption');
        const captionText = captionEl
            ? captionEl.querySelector('h4').textContent + ' — ' + captionEl.querySelector('p').textContent
            : '';

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = captionText;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== Member Card Expand =====
const memberOverlay = document.getElementById('memberOverlay');
const overlayAvatar = document.getElementById('overlayAvatar');
const overlayName = document.getElementById('overlayName');
const overlayMote = document.getElementById('overlayMote');

document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', () => {
        const avatar = card.querySelector('.member-avatar');
        const name = card.querySelector('.member-name').textContent;
        const mote = card.querySelector('.member-mote').textContent;

        overlayAvatar.innerHTML = avatar.innerHTML;
        overlayName.textContent = name;
        overlayMote.textContent = mote;
        memberOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeMemberOverlay() {
    memberOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

memberOverlay.addEventListener('click', (e) => {
    if (e.target === memberOverlay) {
        closeMemberOverlay();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && memberOverlay.classList.contains('active')) {
        closeMemberOverlay();
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    setupRevealAnimations();
    handleNavbarScroll();
    updateActiveNav();
});
