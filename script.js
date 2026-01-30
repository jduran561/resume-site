// ===========================================
// 1. VISITOR COUNTER INTEGRATION
// ===========================================
const FUNCTION_URL = 'https://resume-visitor-counter2-btdyc8dxhncnd2cz.westus2-01.azurewebsites.net/api/GetVisitorCount';

async function updateVisitorCount() {
    try {
        const response = await fetch(FUNCTION_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        document.getElementById('visitorCount').textContent = data.count;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        document.getElementById('visitorCount').textContent = 'offline';
    }
}

// ===========================================
// 2. HAMBURGER MENU FUNCTIONALITY
// ===========================================
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Update ARIA attribute
        const isExpanded = navLinks.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===========================================
// 3. DARK MODE FUNCTIONALITY
// ===========================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');

    // Apply saved preference on page load
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }

        // Add a fun animation
        darkModeToggle.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            darkModeToggle.style.transform = '';
        }, 300);
    });
}

// ===========================================
// 4. PERFORMANCE METRICS TRACKING
// ===========================================
function initPerformanceMetrics() {
    const perfToggle = document.getElementById('perfToggle');
    const perfDetails = document.getElementById('perfDetails');

    if (!perfToggle || !perfDetails) return;

    // Toggle performance details display
    perfToggle.addEventListener('click', () => {
        const isVisible = perfDetails.style.display === 'block';
        perfDetails.style.display = isVisible ? 'none' : 'block';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!perfToggle.contains(e.target) && !perfDetails.contains(e.target)) {
            perfDetails.style.display = 'none';
        }
    });

    // Collect and display performance metrics
    window.addEventListener('load', () => {
        // Wait a bit for all resources to load
        setTimeout(() => {
            calculatePerformanceMetrics();
        }, 500);
    });
}

function calculatePerformanceMetrics() {
    try {
        const perfData = performance.getEntriesByType('navigation')[0];

        if (!perfData) {
            console.warn('Performance API not supported');
            return;
        }

        // Calculate metrics
        const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);
        const domReady = Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart);

        // Count resources
        const resources = performance.getEntriesByType('resource');
        const resourceCount = resources.length;

        // Calculate total resource size (if available)
        let totalSize = 0;
        resources.forEach(resource => {
            if (resource.transferSize) {
                totalSize += resource.transferSize;
            }
        });

        // Format size in KB or MB
        const sizeInKB = Math.round(totalSize / 1024);
        const sizeDisplay = sizeInKB > 1024
            ? `${(sizeInKB / 1024).toFixed(2)} MB`
            : `${sizeInKB} KB`;

        // Display metrics
        document.getElementById('loadTime').textContent = `${loadTime}ms`;
        document.getElementById('domReady').textContent = `${domReady}ms`;
        document.getElementById('resources').textContent = `${resourceCount} (${sizeDisplay})`;

        // Log detailed metrics to console for debugging
        console.log('📊 Performance Metrics:', {
            'Load Time': `${loadTime}ms`,
            'DOM Ready': `${domReady}ms`,
            'Resources': resourceCount,
            'Total Size': sizeDisplay,
            'DNS Lookup': `${Math.round(perfData.domainLookupEnd - perfData.domainLookupStart)}ms`,
            'TCP Connection': `${Math.round(perfData.connectEnd - perfData.connectStart)}ms`,
            'Server Response': `${Math.round(perfData.responseEnd - perfData.requestStart)}ms`,
            'DOM Processing': `${Math.round(perfData.domComplete - perfData.domInteractive)}ms`
        });

    } catch (error) {
        console.error('Error calculating performance metrics:', error);
        document.getElementById('loadTime').textContent = 'N/A';
        document.getElementById('domReady').textContent = 'N/A';
        document.getElementById('resources').textContent = 'N/A';
    }
}

// ===========================================
// 5. SMOOTH SCROLLING FOR ANCHOR LINKS
// ===========================================
function initSmoothScroll() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't scroll if it's just "#"
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80; // Account for fixed header if any
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================================
// 6. ACTIVE NAVIGATION LINK HIGHLIGHTING
// ===========================================
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Update on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateActiveLink();
}

// ===========================================
// 7. IMAGE LAZY LOADING FALLBACK
// ===========================================
function initLazyLoadingFallback() {
    // Modern browsers support native lazy loading
    // This is a fallback for older browsers
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        return;
    }

    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===========================================
// 8. ANIME.JS SCROLL-TRIGGERED ANIMATIONS
// ===========================================

// Hero Title: Letter-by-Letter Bounce
function animateHeroTitle() {
    const titleEl = document.getElementById('hero-title');
    if (!titleEl) return;

    const text = titleEl.textContent;
    titleEl.innerHTML = text.split('').map(ch =>
        ch === ' ' ? ' ' : '<span class="letter">' + ch + '</span>'
    ).join('');

    anime({
        targets: '#hero-title .letter',
        opacity: [0, 1],
        translateY: [-40, 0],
        rotateZ: [-15, 0],
        easing: 'easeOutBounce',
        duration: 800,
        delay: anime.stagger(60)
    });
}

// Visitor Badge Pop
function animateVisitorBadge() {
    anime({
        targets: '.visitor-badge',
        opacity: [0, 1],
        scale: [0.5, 1],
        easing: 'easeOutElastic(1, .6)',
        duration: 1000,
        delay: 600
    });
}

// Hero Subtitle Fade
function animateSubtitle() {
    anime({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutQuad',
        duration: 600,
        delay: 900
    });
}

// Scroll-triggered animations via IntersectionObserver
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSection(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-animate]').forEach(section => {
        observer.observe(section);
    });
}

function animateSection(section) {
    // Section Title: Wipe in + Underline Draw
    const title = section.querySelector('.section-title');
    if (title) {
        anime({
            targets: title,
            opacity: [0, 1],
            translateX: [-30, 0],
            easing: 'easeOutExpo',
            duration: 600,
            complete: function() {
                title.classList.add('underline-visible');
            }
        });
    }

    // Summary Text Fade
    const summary = section.querySelector('.professional-summary');
    if (summary) {
        anime({
            targets: summary,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutQuad',
            duration: 700,
            delay: 300
        });
    }

    // Skill / Cert Cards: Staggered Pop In
    const cards = section.querySelectorAll('.quirk-card');
    if (cards.length) {
        anime({
            targets: cards,
            opacity: [0, 1],
            scale: [0.5, 1],
            rotate: ['-5deg', '0deg'],
            easing: 'easeOutElastic(1, .6)',
            duration: 1000,
            delay: anime.stagger(200, { start: 300 }),
            complete: function() {
                // Animate power bars after cards appear
                const bars = section.querySelectorAll('.power-bar');
                if (bars.length) {
                    anime({
                        targets: bars,
                        width: [0, function(el) {
                            return getComputedStyle(el).width;
                        }],
                        easing: 'easeInOutQuart',
                        duration: 400,
                        delay: anime.stagger(80)
                    });
                }
            }
        });
    }

    // Experience Items: Slide In from Left
    const expItems = section.querySelectorAll('.experience-item');
    if (expItems.length) {
        anime({
            targets: expItems,
            opacity: [0, 1],
            translateX: [-60, 0],
            easing: 'easeOutCubic',
            duration: 700,
            delay: anime.stagger(300, { start: 300 })
        });
    }

    // Contact Items: Elastic Bounce In
    const contacts = section.querySelectorAll('.contact-item');
    if (contacts.length) {
        anime({
            targets: contacts,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.8, 1],
            easing: 'easeOutElastic(1, .5)',
            duration: 1200,
            delay: anime.stagger(150, { start: 300 })
        });
    }
}

// ===========================================
// 9. INITIALIZE ALL FEATURES ON PAGE LOAD
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    updateVisitorCount();
    initHamburgerMenu();
    initDarkMode();
    initPerformanceMetrics();
    initSmoothScroll();
    initActiveNavigation();
    initLazyLoadingFallback();

    console.log('✅ All features initialized successfully!');
    console.log('🎨 Theme:', localStorage.getItem('darkMode') || 'light');
});

// Anime.js animations kick off after full page load
window.addEventListener('load', () => {
    animateHeroTitle();
    animateVisitorBadge();
    animateSubtitle();
    initScrollAnimations();
});

// ===========================================
// 10. CONNECTION STATUS MONITORING
// ===========================================
window.addEventListener('online', () => {
    console.log('🟢 Connection restored');
    updateVisitorCount(); // Retry visitor count on reconnection
});

window.addEventListener('offline', () => {
    console.log('🔴 Connection lost');
    document.getElementById('visitorCount').textContent = 'offline';
});
