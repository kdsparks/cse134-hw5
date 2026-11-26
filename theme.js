const themeToggle = document.querySelector('theme-toggle');

themeToggle.addEventListener('click', () => {
    if (document.documentElement.dataset.theme === 'light') {
        document.documentElement.dataset.theme = 'dark';
    }
    else {
        document.documentElement.dataset.theme = 'light';
    }
});