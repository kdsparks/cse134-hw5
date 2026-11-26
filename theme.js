let theme = 'light';

const themeToggle = document.querySelector('theme-toggle');

themeToggle.addEventListener('click', () => {
    if (theme === 'light') {
        theme = 'dark';
    }
    else {
        theme = 'light';
    }
    console.log(theme);
});