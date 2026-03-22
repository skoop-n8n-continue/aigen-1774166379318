/**
 * Fetch and parse data.json
 */
async function loadAppData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load app data:', error);
        return null;
    }
}

/**
 * Initialize the application
 */
async function init() {
    const data = await loadAppData();
    if (!data) return;

    // 1. Apply visual styles from data.json
    const settings = data.sections.app_settings;
    if (settings) {
        document.documentElement.style.setProperty('--primary-color', settings.primary_color.value);
        document.documentElement.style.setProperty('--background-color', settings.background_color.value);
        document.documentElement.style.setProperty('--text-color', settings.text_color.value);
    }

    // 2. Map content from data.json
    const content = data.sections.content;
    if (content) {
        // Headline and subtext
        document.querySelector('.headline').textContent = content.headline.value || '';
        document.querySelector('.subtext').textContent = content.subtext.value || '';

        // Logo
        const logoPath = content.logo.value;
        const logoImg = document.querySelector('.logo');
        if (logoPath) {
            logoImg.src = logoPath;
            logoImg.style.display = 'inline-block';
        } else {
            logoImg.style.display = 'none';
        }
    }

    // 3. Reveal the app
    // Small timeout to ensure styles are applied and images are loading
    setTimeout(() => {
        document.getElementById('app-container').classList.add('loaded');
    }, 100);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
