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

// Affiliate Marketing Tools Data
const affiliateTools = [
    {
        name: 'Impact',
        description: 'Partnership management and affiliate tracking platform',
        icon: 'fas fa-handshake'
    },
    {
        name: 'ShareASale',
        description: 'Reliable affiliate marketing network for merchants and affiliates',
        icon: 'fas fa-share-alt'
    },
    {
        name: 'CJ Affiliate',
        description: 'Global affiliate marketing network for driving conversions',
        icon: 'fas fa-globe'
    },
    {
        name: 'Awin',
        description: 'Affiliate network connecting advertisers with publishers',
        icon: 'fas fa-project-diagram'
    },
    {
        name: 'Rakuten Advertising',
        description: 'High-quality affiliate network and performance marketing',
        icon: 'fas fa-shopping-bag'
    },
    {
        name: 'PartnerStack',
        description: 'B2B SaaS partnership and affiliate management platform',
        icon: 'fas fa-layer-group'
    },
    {
        name: 'Everflow',
        description: 'Partner marketing and performance tracking platform',
        icon: 'fas fa-chart-line'
    },
    {
        name: 'Refersion',
        description: 'Affiliate and influencer marketing platform for ecommerce',
        icon: 'fas fa-bullhorn'
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
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.title = 'Switch to Light Mode';
        if (themeToggle.querySelector('.tooltip')) themeToggle.querySelector('.tooltip').textContent = 'Light Mode';
    }
    localStorage.setItem('theme', 'dark');
}

function enableLightTheme() {
    body.classList.remove('dark-mode');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Switch to Dark Mode';
        if (themeToggle.querySelector('.tooltip')) themeToggle.querySelector('.tooltip').textContent = 'Dark Mode';
    }
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
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        if (navRight) navRight.classList.toggle('active');

        // Change menu icon
        const icon = mobileToggle.querySelector('i');
        if (navRight && navRight.classList.contains('active')) {
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        } else {
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

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

// Image Modal Functions
function openImageModal(imageSrc, altText) {
    if (modalImage && imageModal) {
        modalImage.src = imageSrc;
        modalImage.alt = altText;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    if (imageModal) {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add click event to image cards
document.querySelectorAll('.image-card').forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (img) {
            const imageSrc = img.src;
            const altText = img.alt;
            openImageModal(imageSrc, altText);
        }
    });
});

// Modal close buttons
if (imageModalClose) imageModalClose.addEventListener('click', closeImageModal);
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
    if (!toolsGrid || !toolsModal) return;

    toolsGrid.innerHTML = '';

    affiliateTools.forEach(tool => {
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
        if (imageModal && imageModal.classList.contains('active')) {
            closeImageModal();
        }
        if (toolsModal && toolsModal.classList.contains('active')) {
            closeToolsModal();
        }
        if (navRight && navRight.classList.contains('active')) {
            navRight.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }

    // Ctrl/Cmd + D to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (themeToggle) themeToggle.click();
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
if (modalImage) {
    modalImage.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing when clicking on image
    });
}
