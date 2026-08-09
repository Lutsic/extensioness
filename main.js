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
    document.querySelectorAll(".hero-content button").forEach(el => {el.style.background = "linear-gradient(60deg,rgba(38, 189, 216, 1) 50%, rgba(64, 255, 221, 1) 100%);";})

    document.querySelectorAll("hr").forEach(el => {el.style.color = "rgba(64, 255, 221, 1)";})

    document.getElementById("gradient_title").style.background = "linear-gradient(45deg, #26bdd8, #40ffdd)";
    document.getElementById("gradient_title").style.backgroundClip = "text";
    document.getElementById("gradient_title").style.webkitBackgroundClip = "text";
    document.getElementById("gradient_title").style.color = "transparent";

    document.getElementById("online_games_txt").style.background = "linear-gradient(45deg, #26bdd8, #40ffdd)";
    document.getElementById("online_games_txt").style.backgroundClip = "text";
    document.getElementById("online_games_txt").style.webkitBackgroundClip = "text";
    document.getElementById("online_games_txt").style.color = "transparent";

    document.getElementById("extensions_txt").style.background = "linear-gradient(45deg, #26bdd8, #40ffdd)";
    document.getElementById("extensions_txt").style.backgroundClip = "text";
    document.getElementById("extensions_txt").style.webkitBackgroundClip = "text";
    document.getElementById("extensions_txt").style.color = "transparent";

    document.getElementById("header").style.borderBottom = "1.5px solid #04dfd9";

    document.querySelector("body").style.backgroundColor = "#202428";
    document.getElementById("header").style.backgroundColor = "#2b3035";
    document.querySelectorAll(".hero").forEach(el => {el.style.backgroundColor = "#2b3035";})

    return;
}
if (settings.theme == "Sunset"){
    document.querySelectorAll(".hero-content button").forEach(el => {el.style.background = "linear-gradient(45deg, #ff6f4b, #e13661)";})

    document.querySelectorAll("hr").forEach(el => {el.style.color = "#fd4c55";})

    document.getElementById("gradient_title").style.background = "linear-gradient(45deg, #ff6f4b, #e13661)";
    document.getElementById("gradient_title").style.backgroundClip = "text";
    document.getElementById("gradient_title").style.webkitBackgroundClip = "text";
    document.getElementById("gradient_title").style.color = "transparent";

    document.getElementById("online_games_txt").style.background = "linear-gradient(45deg, #ff6f4b, #e13661)";
    document.getElementById("online_games_txt").style.backgroundClip = "text";
    document.getElementById("online_games_txt").style.webkitBackgroundClip = "text";
    document.getElementById("online_games_txt").style.color = "transparent";

    document.getElementById("extensions_txt").style.background = "linear-gradient(45deg, #ff6f4b, #e13661)";
    document.getElementById("extensions_txt").style.backgroundClip = "text";
    document.getElementById("extensions_txt").style.webkitBackgroundClip = "text";
    document.getElementById("extensions_txt").style.color = "transparent";

    document.getElementById("header").style.borderBottom = "1.5px solid #fd4c55";

    document.querySelector("body").style.backgroundColor = "#0F1118";
    document.getElementById("header").style.backgroundColor = "#161A24";
    document.querySelectorAll(".hero").forEach(el => {el.style.backgroundColor = "#161A24";})

    return;
}
if (settings.theme == "Cosmos"){
    return;
}

}

updateTheme()