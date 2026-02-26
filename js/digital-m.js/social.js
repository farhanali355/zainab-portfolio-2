// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const toolsBtn = document.getElementById('toolsBtn');
const toolsModal = document.getElementById('toolsModal');
const toolsModalClose = document.getElementById('toolsModalClose');
const mobileToggle = document.querySelector('.mobile-toggle');
const navRight = document.querySelector('.nav-right');
const body = document.body;

// Image Zoom Modal Elements
const imageZoomModal = document.getElementById('imageZoomModal');
const zoomedImage = document.getElementById('zoomedImage');

// Social Media Tools Data
const socialTools = [
    {
        name: 'Meta Business Suite',
        description: 'Manage Facebook and Instagram marketing from one place',
        icon: 'fab fa-meta'
    },
    {
        name: 'TikTok Ads Manager',
        description: 'Create and optimize viral video ad campaigns',
        icon: 'fab fa-tiktok'
    },
    {
        name: 'Hootsuite',
        description: 'Comprehensive social media management dashboard',
        icon: 'fas fa-hashtag'
    },
    {
        name: 'Buffer',
        description: 'Simplified social media scheduling and planning',
        icon: 'fab fa-buffer'
    },
    {
        name: 'Canva',
        description: 'Graphic design tool for stunning social media visuals',
        icon: 'fas fa-palette'
    },
    {
        name: 'Sprout Social',
        description: 'Deep social media analytics and social listening',
        icon: 'fas fa-leaf'
    },
    {
        name: 'LinkedIn Campaign',
        description: 'Targeted B2B advertising platform for professionals',
        icon: 'fab fa-linkedin'
    },
    {
        name: 'BuzzSumo',
        description: 'Content discovery and influencer research tool',
        icon: 'fas fa-chart-line'
    }
];

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkTheme();
    } else {
        enableLightTheme();
    }
}

function enableDarkTheme() {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.title = 'Switch to Light Mode';
    if (themeToggle.querySelector('.tooltip')) themeToggle.querySelector('.tooltip').textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
}

function enableLightTheme() {
    body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Switch to Dark Mode';
    if (themeToggle.querySelector('.tooltip')) themeToggle.querySelector('.tooltip').textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        enableLightTheme();
    } else {
        enableDarkTheme();
    }
});

// Mobile Menu Toggle
mobileToggle.addEventListener('click', () => {
    navRight.classList.toggle('active');

    // Change menu icon
    const icon = mobileToggle.querySelector('i');
    if (navRight.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileToggle && !mobileToggle.contains(e.target) && navRight && !navRight.contains(e.target)) {
        navRight.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Image Zoom Functions
function openZoom(imageSrc) {
    if (zoomedImage && imageZoomModal) {
        zoomedImage.src = imageSrc;
        imageZoomModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeZoom() {
    if (imageZoomModal) {
        imageZoomModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Global functions for HTML access
window.openZoom = function (card) {
    const img = card.querySelector('img');
    if (img) openZoom(img.src);
};
window.closeZoom = closeZoom;

// Tools Modal Functions
function openToolsModal() {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid || !toolsModal) return;

    toolsGrid.innerHTML = '';

    socialTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <div class="tool-icon">
                <i class="${tool.icon}"></i>
            </div>
            <h3 class="tool-name">${tool.name}</h3>
            <p class="tool-desc">${tool.description}</p>
        `;
        toolsGrid.appendChild(toolCard);
    });

    toolsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeToolsModal() {
    if (toolsModal) {
        toolsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (toolsBtn) toolsBtn.addEventListener('click', openToolsModal);
if (toolsModalClose) toolsModalClose.addEventListener('click', closeToolsModal);
if (toolsModal) {
    toolsModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeToolsModal();
        }
    });
}

// Counter Animation for Results
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const suffix = element.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Initialize counters when in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.result-number');
            if (numberElement && numberElement.getAttribute('data-count')) {
                animateCounter(numberElement);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe results
document.querySelectorAll('.result-card').forEach(item => {
    observer.observe(item);
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeZoom();
        closeToolsModal();
        if (navRight && navRight.classList.contains('active')) {
            navRight.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
});

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copy p');
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; Copyright ${currentYear} by Zainab Samnan`;
    }

    // Section Fade-in Animation
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
});