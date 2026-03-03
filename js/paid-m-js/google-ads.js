// Basic required scripts for new Google Ads page

document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle (Simplified)
    const themeBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(currentTheme);
    updateIcon(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.replace('light-mode', 'dark-mode');
                localStorage.setItem('theme', 'dark-mode');
                updateIcon('dark-mode');
            } else {
                body.classList.replace('dark-mode', 'light-mode');
                localStorage.setItem('theme', 'light-mode');
                updateIcon('light-mode');
            }
        });
    }

    function updateIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        const text = themeBtn.querySelector('.tooltip');

        if (theme === 'dark-mode') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    }

});
