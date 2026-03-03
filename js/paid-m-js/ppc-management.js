// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle ? themeToggle.querySelector('i') : null;

// Load preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (icon) icon.className = 'fas fa-sun';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.top = '10px';
    } else {
        navbar.style.top = '20px';
    }
});
