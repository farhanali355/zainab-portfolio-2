// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const toolsBtn = document.getElementById('toolsBtn');
const toolsModal = document.getElementById('toolsModal');
const toolsModalClose = document.getElementById('toolsModalClose');
const mobileToggle = document.querySelector('.mobile-toggle');
const navRight = document.querySelector('.nav-right');
const body = document.body;

// Image Modal Elements
const imageModal = document.getElementById('imageModal');
const imageModalClose = document.getElementById('imageModalClose');
const modalImage = document.getElementById('modalImage');

// Tools Data
const seoTools = [
    {
        name: 'Grammarly',
        description: 'Advanced grammar, tone, and clarity checking',
        icon: 'fas fa-spell-check'
    },
    {
        name: 'Surfer SEO',
        description: 'Data-driven content optimization for search',
        icon: 'fas fa-chart-line'
    },
    {
        name: 'Hemingway Editor',
        description: 'Improves readability and makes writing bold',
        icon: 'fas fa-edit'
    },
    {
        name: 'Jasper AI',
        description: 'AI-assisted copywriting generation',
        icon: 'fas fa-robot'
    },
    {
        name: 'Ahrefs',
        description: 'Content gap and keyword research',
        icon: 'fas fa-search'
    },
    {
        name: 'Copyscape',
        description: 'Professional plagiarism detection',
        icon: 'fas fa-shield-alt'
    },
    {
        name: 'Google Docs',
        description: 'Real-time content collaboration',
        icon: 'fab fa-google'
    },
    {
        name: 'Notion',
        description: 'Content calendar and workspace planning',
        icon: 'fas fa-book'
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
    themeToggle.querySelector('.tooltip').textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
}

function enableLightTheme() {
    body.classList.remove('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Switch to Dark Mode';
    themeToggle.querySelector('.tooltip').textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            enableLightTheme();
        } else {
            enableDarkTheme();
        }
    });
}

// Mobile Menu Toggle
if (mobileToggle && navRight) {
    mobileToggle.addEventListener('click', () => {
        navRight.classList.toggle('active');

        // Change menu icon
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            if (navRight.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileToggle && navRight) {
        if (!mobileToggle.contains(e.target) && !navRight.contains(e.target)) {
            navRight.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
});

// Image Modal Functions
function openImageModal(imageSrc, altText) {
    modalImage.src = imageSrc;
    modalImage.alt = altText;
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add click event to image cards
document.querySelectorAll('.image-card').forEach(card => {
    card.addEventListener('click', () => {
        const imageSrc = card.querySelector('img').src;
        const altText = card.querySelector('img').alt;
        openImageModal(imageSrc, altText);
    });
});

// Modal close buttons
if (imageModalClose) {
    imageModalClose.addEventListener('click', closeImageModal);
}
if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeImageModal();
        }
    });
}

// Tools Modal Functions
function openToolsModal() {
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = '';

    seoTools.forEach(tool => {
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
    toolsModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (toolsBtn) {
    toolsBtn.addEventListener('click', openToolsModal);
}
if (toolsModalClose) {
    toolsModalClose.addEventListener('click', closeToolsModal);
}
if (toolsModal) {
    toolsModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeToolsModal();
        }
    });
}

// Counter Animation for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    if (!target) return;

    const duration = 1500; // milliseconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.stat-number');
            if (numberElement && numberElement.getAttribute('data-count')) {
                animateCounter(numberElement);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats
document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        if (imageModal.classList.contains('active')) {
            closeImageModal();
        }
        if (toolsModal.classList.contains('active')) {
            closeToolsModal();
        }
        if (navRight.classList.contains('active')) {
            navRight.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Ctrl/Cmd + D to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', () => {
    initTheme();

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copy p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2026', currentYear);
    }

    // Add loading animation
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);

    // Add animation to elements when they come into view
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe content sections
    document.querySelectorAll('.content-block, .element-card, .image-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contentObserver.observe(element);
    });
});

// Add hover effect to CTA button
const ctaButton = document.querySelector('.cta-btn');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.transform = 'translateY(-5px) scale(1.05)';
    });

    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = 'translateY(0) scale(1)';
    });
}

// Close modal when clicking on the image itself (optional)
modalImage.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing when clicking on image
});