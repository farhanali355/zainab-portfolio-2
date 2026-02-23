// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-toggle')) {
            if (navLinks) navLinks.classList.remove('active');
            if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Active nav link on scroll
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu
                if (navLinks) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.style.boxShadow = 'var(--shadow-nav)';
                navbar.style.transform = 'translate(-50%, 0)';
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down - hide navbar
                navbar.style.transform = 'translate(-50%, -100%)';
            } else {
                // Scrolling up - show navbar
                navbar.style.transform = 'translate(-50%, 0)';
                navbar.style.boxShadow = 'var(--shadow-nav)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Typing animation for hero
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        const texts = [
            'Digital Presence',
            'Search Rankings',
            'Organic Traffic',
            'Business Growth'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeText, 500);
            } else {
                setTimeout(typeText, isDeleting ? 50 : 100);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeText, 1000);
    }
    
    // Animated counter for stats
    function animateCounter(element) {
        if (!element) return;
        
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
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
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate service cards
                if (entry.target.classList.contains('service-card')) {
                    entry.target.classList.add('visible');
                }
                
                // Animate result cards
                if (entry.target.classList.contains('result-card')) {
                    entry.target.classList.add('visible');
                    
                    // Animate counters in result cards
                    const counter = entry.target.querySelector('.result-number[data-count]');
                    if (counter && !counter.hasAttribute('data-animated')) {
                        counter.setAttribute('data-animated', 'true');
                        animateCounter(counter);
                    }
                }
                
                // Animate stat counters in hero
                if (entry.target.classList.contains('hero')) {
                    const statCounters = document.querySelectorAll('.stat-number[data-count]');
                    statCounters.forEach(counter => {
                        if (!counter.hasAttribute('data-animated')) {
                            counter.setAttribute('data-animated', 'true');
                            animateCounter(counter);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.result-card').forEach(card => observer.observe(card));
    if (document.querySelector('.hero')) observer.observe(document.querySelector('.hero'));
    
    // Tools Modal functionality - FIXED
    const toolsModal = document.getElementById('toolsModal');
    const toolsBtn = document.getElementById('toolsBtn');
    const toolsModalClose = document.getElementById('toolsModalClose');
    const toolsModalOverlay = toolsModal ? toolsModal.querySelector('.modal-overlay') : null;
    const toolsGrid = document.getElementById('toolsGrid');
    
    // Tools data
    const toolsData = [
        {
            name: 'SEMrush',
            desc: 'Comprehensive SEO toolkit for keyword research, competitor analysis, and site auditing',
            icon: 'fas fa-chart-bar'
        },
        {
            name: 'Ahrefs',
            desc: 'Backlink analysis, keyword research, and competitor tracking platform',
            icon: 'fas fa-link'
        },
        {
            name: 'Google Analytics',
            desc: 'Website traffic analysis and user behavior tracking',
            icon: 'fab fa-google'
        },
        {
            name: 'Screaming Frog',
            desc: 'Website crawler for technical SEO analysis and auditing',
            icon: 'fas fa-spider'
        },
        {
            name: 'Google Search Console',
            desc: 'Monitor website performance in Google search results',
            icon: 'fas fa-search'
        },
        {
            name: 'Moz Pro',
            desc: 'SEO software for tracking rankings and analyzing sites',
            icon: 'fas fa-chart-line'
        },
        {
            name: 'Surfer SEO',
            desc: 'Content optimization and on-page SEO analysis tool',
            icon: 'fas fa-wave-square'
        },
        {
            name: 'Clearscope',
            desc: 'AI-powered content optimization platform',
            icon: 'fas fa-brain'
        }
    ];
    
    // Populate tools grid
    if (toolsGrid) {
        toolsData.forEach(tool => {
            const toolItem = document.createElement('div');
            toolItem.className = 'tool-item';
            toolItem.innerHTML = `
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <h4>${tool.name}</h4>
                <p>${tool.desc}</p>
            `;
            toolsGrid.appendChild(toolItem);
        });
    }
    
    function openToolsModal() {
        if (toolsModal) {
            toolsModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeToolsModal() {
        if (toolsModal) {
            toolsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Event listeners for tools modal - WITH ERROR HANDLING
    if (toolsBtn) {
        toolsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openToolsModal();
        });
        
        // Add cursor pointer
        toolsBtn.style.cursor = 'pointer';
    }
    
    if (toolsModalClose) {
        toolsModalClose.addEventListener('click', closeToolsModal);
    }
    
    if (toolsModalOverlay) {
        toolsModalOverlay.addEventListener('click', closeToolsModal);
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toolsModal && toolsModal.style.display === 'flex') {
            closeToolsModal();
        }
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && window.innerWidth > 768) {
            heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
    
    // Initialize
    setActiveNavLink();
    
    console.log('SEO Services website initialized successfully!');
});