const DEFAULTS = {
    theme: 'Modern',
    coloredTiles: 'On',
    hideOnUnfocus: 'Off'
};


function loadSettings() {
    const settings = {};
    settings.theme = localStorage.getItem('extensioness_theme') || DEFAULTS.theme;
    settings.coloredTiles = localStorage.getItem('extensioness_coloredTiles') || DEFAULTS.coloredTiles;
    settings.hideOnUnfocus = localStorage.getItem('extensioness_hideOnUnfocus') || DEFAULTS.hideOnUnfocus;
    return settings;
}


function updateTheme() {
    const settings = loadSettings();
    if (settings.theme == "Modern"){
        document.documentElement.dataset.theme = "Modern";
        return;
    }
    if (settings.theme == "Sunset"){
        document.documentElement.dataset.theme = "Sunset";
        return;
    }
}


function saveSetting(key, value) {
    localStorage.setItem(`extensioness_${key}`, value);
}

function applySettings(settings) {
    updateTheme()

    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === settings.theme);
    });

    // Toggle buttons
    const coloredBtn = document.getElementById('coloredTiles');
    coloredBtn.dataset.state = settings.coloredTiles;
    coloredBtn.textContent = settings.coloredTiles;

    const hideBtn = document.getElementById('hideOnUnfocus');
    hideBtn.dataset.state = settings.hideOnUnfocus;
    hideBtn.textContent = settings.hideOnUnfocus;
}

function init() {
    const settings = loadSettings();
    applySettings(settings);

    // Theme selection
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            saveSetting('theme', theme);
            applySettings({ ...loadSettings(), theme });
        });
    });

    // Colored tiles toggle
    document.getElementById('coloredTiles').addEventListener('click', () => {
        const current = loadSettings().coloredTiles;
        const next = current === 'On' ? 'Off' : 'On';
        saveSetting('coloredTiles', next);
        applySettings({ ...loadSettings(), coloredTiles: next });
    });

    // Hide on unfocus toggle
    document.getElementById('hideOnUnfocus').addEventListener('click', () => {
        const current = loadSettings().hideOnUnfocus;
        const next = current === 'On' ? 'Off' : 'On';
        saveSetting('hideOnUnfocus', next);
        applySettings({ ...loadSettings(), hideOnUnfocus: next });
    });
}

document.addEventListener('DOMContentLoaded', init);