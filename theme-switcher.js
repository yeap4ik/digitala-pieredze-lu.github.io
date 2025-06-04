const toggleBtn = document.getElementById('theme-toggle');
const toggleBtn2 = document.getElementById('theme-toggle2');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(dark) {
    document.body.classList.toggle('dark-theme', dark);
    toggleBtn.textContent = dark ? '🌞' : '🌚';
    toggleBtn2.textContent = dark ? '🌞' : '🌚';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Начальная установка темы
const savedTheme = localStorage.getItem('theme');
const useDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
setTheme(useDark);

toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(!isDark);
});

toggleBtn2.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(!isDark);
})