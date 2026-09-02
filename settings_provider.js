const DEFAULTS = {
    theme: 'Modern',
    coloredTiles: 'On',
    hideOnUnfocus: 'Off'
};

const github_icon_sunset = document.getElementById("github_icon_sunset")
const github_icon_modern = document.getElementById("github_icon_modern")

const settings_sunset = document.getElementById("settings_sunset")
const settings_modern = document.getElementById("settings_modern")

const filters_sunset = document.getElementById("filters_sunset")
const filters_modern = document.getElementById("filters_modern")

function loadSettings() {
    const settings = {};
    settings.theme = localStorage.getItem('extensioness_theme') || DEFAULTS.theme;
    settings.coloredTiles = localStorage.getItem('extensioness_coloredTiles') || DEFAULTS.coloredTiles;
    settings.hideOnUnfocus = localStorage.getItem('extensioness_hideOnUnfocus') || DEFAULTS.hideOnUnfocus;
    return settings;
}

const settings = loadSettings()

if(settings.hideOnUnfocus == 'On'){
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            window.location.href = 'https://google.com';
        }
    });
}

function updateTheme() {
    if (settings.theme == "Modern"){
        document.documentElement.dataset.theme = "Modern";

        if(github_icon_modern) {github_icon_modern.style.display = "block"}
        if(github_icon_sunset) {github_icon_sunset.style.display = "none"}

        if(settings_modern) {settings_modern.style.display = "block"}
        if(settings_sunset) {settings_sunset.style.display = "none"}

        if(filters_modern) {filters_modern.style.display = "block"}
        if(filters_sunset) {filters_sunset.style.display = "none"}

        return;
    }
    if (settings.theme == "Sunset"){
        document.documentElement.dataset.theme = "Sunset";

        if(github_icon_modern) {github_icon_modern.style.display = "none"}
        if(github_icon_sunset) {github_icon_sunset.style.display = "block";}

        if(settings_modern) {settings_modern.style.display = "none"}
        if(settings_sunset) {settings_sunset.style.display = "block"}

        if(filters_modern) {filters_modern.style.display = "none"}
        if(filters_sunset) {filters_sunset.style.display = "block"}

        return;
    }
}

updateTheme()