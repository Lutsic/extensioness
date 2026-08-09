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
    document.getElementById("gradient_title").style.background = "linear-gradient(45deg, #26bdd8, #40ffdd)";
    document.getElementById("gradient_title").style.backgroundClip = "text";
    document.getElementById("gradient_title").style.webkitBackgroundClip = "text";
    document.getElementById("gradient_title").style.color = "transparent";

    document.getElementById("header").style.borderBottom = "1.5px solid #04dfd9";

    document.querySelectorAll(".setting-card").forEach(el => {el.style.setProperty("--hover-color", "#04dfd9");})

    document.querySelector("body").style.backgroundColor = "#202428";
    document.querySelectorAll(".setting-card").forEach(el => {el.style.backgroundColor = "#2b3035";})
    document.querySelectorAll(".theme-btn").forEach(el => {el.style.backgroundColor = "#252a30";})
    document.getElementById("header").style.backgroundColor = "#2b3035";

    document.querySelectorAll(".theme-btn").forEach(el => {el.style.setProperty("--hover-color", "#04dfd9");})
    document.querySelectorAll(".theme-btn").forEach(el => {el.style.setProperty("--active-color", "linear-gradient(45deg, #26bdd8, #40ffdd)");})

    document.querySelectorAll(".toggle-btn").forEach(el => {el.style.setProperty("--active-color", "linear-gradient(45deg, #26bdd8, #40ffdd)");})

    return;
}
if (settings.theme == "Sunset"){
    document.getElementById("gradient_title").style.background = "linear-gradient(45deg, #ff6f4b, #e13661)";
    document.getElementById("gradient_title").style.backgroundClip = "text";
    document.getElementById("gradient_title").style.webkitBackgroundClip = "text";
    document.getElementById("gradient_title").style.color = "transparent";

    document.getElementById("header").style.borderBottom = "1.5px solid #fd4c55";

    document.querySelectorAll(".setting-card").forEach(el => {el.style.setProperty("--hover-color", "#fd4c55");})

    
    document.querySelector("body").style.backgroundColor = "#0F1118";
    document.querySelectorAll(".setting-card").forEach(el => {el.style.backgroundColor = "#161A24";})
    document.querySelectorAll(".theme-btn").forEach(el => {el.style.backgroundColor = "#202636";})
    document.getElementById("header").style.backgroundColor = "#161A24";

    document.querySelectorAll(".theme-btn").forEach(el => {el.style.setProperty("--hover-color", "#fd4c55");})
    document.querySelectorAll(".theme-btn").forEach(el => {el.style.setProperty("--active-color", "linear-gradient(45deg, #ff6f4b, #e13661)");})

    document.querySelectorAll(".toggle-btn").forEach(el => {el.style.setProperty("--active-color", "linear-gradient(45deg, #ff6f4b, #e13661)");})

    return;
}
if (settings.theme == "Cosmos"){

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