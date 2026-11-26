const themeToggle = document.querySelector('theme-toggle');

themeToggle.addEventListener('click', () => {
    const oldTheme = document.documentElement.dataset.theme;
    let newTheme;
    if (oldTheme === 'light') {
        newTheme = 'dark';
    }
    else {
        newTheme = 'light';
    }
    document.documentElement.dataset.theme = newTheme;

    try {
        localStorage.setItem('theme', newTheme);
    }
    catch (error) {
        console.log('Could not save theme preference to localStorage:', error);
    }
});